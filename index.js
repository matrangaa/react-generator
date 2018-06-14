#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');

const choices = fs.readdirSync(`${__dirname}/templates`);
const curDir = process.cwd();

const validateSpaces = (input) => {
  if (input.trim(/^([A-Za-z\-\_/\s/\d])+$/.test(input))) return true;
  else return 'Required field may only contain letters, numbers, underscores, spaces and hashes.';
}

const validateNoSpaces = (input) => {
  if ((/^([A-Za-z\-\_\d])+$/.test(input)) && input.indexOf(' ') < 0 && input.trim().length > 0) return true;
  else return 'Required project name may only include letters, numbers, underscores and hashes.';
};

const questions = [
  {
    name: 'projectName',
    type: 'input',
    message: 'Project name: ',
    validate: validateNoSpaces,
  },
  {
    name: 'version',
    type: 'input',
    message: 'Project version number: ',
    default: '1.0.0',
  },
  {
    name: 'author',
    type: 'input',
    message: 'Author name: ',
    default: '',
    validate: validateSpaces,
  },
  {
    name: 'description',
    type: 'input',
    message: 'Project description: ',
    default: '',
    validate: validateSpaces,
  }
];

inquirer.prompt(questions)
  .then(answers => {
    const project_name = answers['projectName'];
    const project_version = answers['version'];
    const project_author = answers['author'];
    const project_description = answers['description'];
    
    const userAnswers = {
      project_name,
      project_version,
      project_author,
      project_description
    };
    
    const templatePath = `${curDir}/templates`;

    fs.mkdirSync( `${curDir}/${project_name}`);

    createDirectoryContents(templatePath, project_name, userAnswers);
  });

function createDirectoryContents(templatePath, newProjectPath, userAnswers) {

  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;

    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, 'utf8');

      // If NPM does not find an .npmignore file, it will look for a .gitignore file. 
      // Once NPM finds a .gitignore file, it takes that file and over-writes it to be an .npmignore file.
      // The way around this (in a generator) is to initially create an .npmignore file, and over-write the name of the
      // file to be .gitignore
      // 05/2018 Alex Matranga
      if (file === '.npmignore') file = '.gitignore';

      // Write user input into files. User input (as of right now) is only needed in package.json,
      // server/index.js, and public/index.html. Because of the recursive nature of createDirectoryContents,
      // only the file name needs to be specified, not the entire file path.
      if (file === 'package.json') {
        contents = contents.replace('project_name', userAnswers['project_name']);
        contents = contents.replace('project_version', userAnswers['project_version']);
        contents = contents.replace('project_author', userAnswers['project_author']);
        contents = contents.replace('project_description', userAnswers['project_description']);
      }

      if (file === 'index.js') {
        contents = contents.replace('project_name', userAnswers['project_name']);
      }

      if (file === 'index.html') {
        contents = contents.replace('project_name', userAnswers['project_name']);
      }
      
      const writePath = `${curDir}/${newProjectPath}/${file}`;

      fs.writeFileSync(writePath, contents, 'utf8');

    } else if (stats.isDirectory()) {

      fs.mkdirSync(`${curDir}/${newProjectPath}/${file}`);

      createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`, userAnswers);
    }
  });
}
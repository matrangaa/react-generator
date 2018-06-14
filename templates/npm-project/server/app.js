const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static serve the index.html page
app.use(express.static(path.join(__dirname, '../public')));

app.use('/users', routes.users);

module.exports = app;
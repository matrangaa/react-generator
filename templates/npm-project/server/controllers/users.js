const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.User.fetchAll()
    .then(users => {
      res.status(200).send(users);
    })
    .catch(err => {
      res.status(503).send(err);
    });
};

module.exports.create = (req, res) => {

  models.User.forge({ id: req.body.id, name: req.body.name, email: req.body.email })
    .save()
    .then(result => {
      res.status(201).send(result)
    })
    .catch(err => {
      res.status(500).send(err, 'ERROR: error saving user');
    });
};

module.exports.getOne = (req, res) => {
  models.User.where({ id: req.params.id }).fetch()
    .then(user => {
      if (!user) {
        throw user;
      }
      res.status(200).send(user);
    })
    .error(err => {
      res.status(404).send(err);
    });
}

module.exports.update = (req, res) => {
  models.User.where({ id: req.params.id }).fetch()
    .then(user => {
      if (!user) {
        throw user;
      }
      return user.save(req.body, { method: 'UPDATE' });
    })
    .then(() => {
      res.sendStatus(201);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.deleteById = (req, res) => {
  models.User.where({ id: req.params.id }).fetch()
    .then(user => {
      if (!user) {
        throw user;
      }
      return user.destroy();
    })
    .then(() => {
      res.status(204).send('Deleted');
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
}
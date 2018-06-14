const models = require('../../models');

exports.seed = function(knex, Promise) {
  return models.User.where({ email: "admin@domain.com" }).fetch()
    .then((user) => {
      if (user) {
        throw user;
      }
      return models.User.forge({
        name: "Admin",
        email: "admin@domain.com"
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create user');
      throw err;
    })
    .catch(() => {
      console.log('WARNING: default user already exists');
    });
};
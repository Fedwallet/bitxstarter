'use strict';

module.exports = {
  up: function(migration, DataTypes, done) {
    var db = require('../models')(migration.queryInterface.sequelize);
    var sequelize = db.sequelize;
    var User = db.User;

    sequelize
      .sync( { force: false } )
      .success(function () {
        User
        .sync( { force: true } )
        .success(function () {
          User
          .build({
            id: -1,
            username: 'system',
            email:  'system@bitappstore.com',
            admin: true,
            active: true,
            name: 'system'
          })
          .hashPassword('12345678')
          .save()
          .complete(function (err, c) {
            console.log(err ? 'Failure' : 'Success');
            done(c);
          });
        })
        .error(function (err) {
          console.log('Failure', err);
          done();
        });
      });

  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('users').complete(done);
  }
};

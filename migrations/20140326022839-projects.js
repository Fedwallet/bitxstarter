'use strict';

module.exports = {
  up: function(migration, DataTypes, done) {
    var db = require('../models')(migration.queryInterface.sequelize);
    var sequelize = db.sequelize;
    var Project = db.Project;

    sequelize
      .sync( { force: false } )
      .success(function () {
        Project
          .sync( { force: true } )
          .complete(done);
      });
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable('projects').complete(done);
  }
};

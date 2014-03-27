'use strict';

module.exports = {
  up: function(migration, DataTypes, done) {
    var sequelize = migration.queryInterface.sequelize;
    sequelize
      .query(
'CREATE INDEX projects_ranking ON projects (rank(backers_count, created_at) DESC);'
      )
      .complete(function (err, res) {
        if (err) { throw(err); }
        done(null, res);
      });
  },
  down: function(migration, DataTypes, done) {
    var sequelize = migration.queryInterface.sequelize;
    sequelize
      .query(
'DROP INDEX IF EXISTS projects_ranking;'
      )
      .complete(function (err, res) {
        if (err) { throw(err); }
        done(null, res);
      });
  }
};

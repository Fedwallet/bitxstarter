'use strict';

module.exports = {
  up: function(migration, DataTypes, done) {
    var sequelize = migration.queryInterface.sequelize;
    sequelize
      .query('CREATE EXTENSION IF NOT EXISTS hstore;')
      .complete(function (err, res) {
        if (err) { throw(err); }
        done(res);
      });
  },
  down: function(migration, DataTypes, done) {
    /*
    var sequelize = migration.queryInterface.sequelize;
    sequelize
      .query('DROP EXTENSION IF EXISTS hstore;')
      .complete(function (err, res) {
        if (err) throw(err);
        done();
      });
    */
    done();
  }
};

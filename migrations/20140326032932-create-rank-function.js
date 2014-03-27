'use strict';

module.exports = {
  up: function(migration, DataTypes, done) {
    var sequelize = migration.queryInterface.sequelize;
    sequelize
      .query(
'CREATE OR REPLACE FUNCTION rank(backers_count integer, created_at timestamp with time zone) RETURNS float AS $$\n' +
' SELECT ($1 - 1) / pow((date_part("epoch", now()) - date_part("epoch", $2)) / 3600 + 2, 1.8)\n' +
'$$ LANGUAGE SQL IMMUTABLE;'
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
'DROP FUNCTION IF EXISTS rank(backers_count integer, created_at timestamp with time zone);'
      )
      .complete(function (err, res) {
        if (err) { throw(err); }
        done(null, res);
      });
  }
};

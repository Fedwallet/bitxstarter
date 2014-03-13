
module.exports = {
  up: function(migration, DataTypes, done) {
    var db = require('../models')(migration.queryInterface.sequelize);
    var sequelize = db.sequelize;
    var Sequelize = db.Sequelize;
    var Currency = db.Currency;

    var currencies = require('./data/currencies');

    sequelize
      .sync( { force: false } )
      .success(function () {

        Currency
          .sync( { force: true } )
          .success(function () {
            var chainer = new Sequelize.Utils.QueryChainer;
            currencies.forEach(function (v) {
              var c = Currency.build(v);
              chainer.add(c.save());
            });
            chainer
              .run()
              .complete(function (err, c) {
                console.log(err ? 'Failure' : 'Success');
                done();
              });
          });

      })
      .error(function (err) {
        console.log('Failure', err);
        done();
      });

  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('currencies').complete(done);
  }
}

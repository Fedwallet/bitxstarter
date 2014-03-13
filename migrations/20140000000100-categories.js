
module.exports = {
  up: function(migration, DataTypes, done) {
    var db = require('../models')(migration.queryInterface.sequelize);
    var cates = require('./data/categories');
    var sequelize = db.sequelize;
    var Sequelize = db.Sequelize;
    var Category = db.Category;

    sequelize
      .sync({ force: false })
      .success(function () {

        Category
          .sync( { force: true } )
          .success(function () {
            var chainer = new Sequelize.Utils.QueryChainer;
            cates.forEach(function (v) {
              var c = Category.build(v);
              chainer.add(c.saveNew());
            });
            chainer
              .run()
              .complete(function (err, cates) {
                console.log(err ? 'Failure' : 'Success');
                done();
              });
          });

      })
      .error(function (err) {
        console.log('Error', err);
        next();
      });

  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('categories').complete(done);
  }
}

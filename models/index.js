'use strict';

var fs        = require('fs');
var path      = require('path');
var Lazy      = require('lazy.js');
var Sequelize = require('sequelize');
var Seq       = null;

module.exports = function (sequelize) {
  if (Seq) {
    return Seq;
  }

  if (!sequelize) {
    var dbConf    = require('../config').postgre;
    var database = dbConf.database;
    var username = dbConf.username;
    var password = dbConf.password;
    delete dbConf.database;
    delete dbConf.username;
    delete dbConf.password;
    sequelize = new Sequelize(database, username, password, dbConf);
  }

  var db = {};

  fs.readdirSync(__dirname)
    .filter(function (file) {
      return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(function (file) {
      var p = path.join(__dirname, file);
      var model = sequelize.import(p);
      if (fs.lstatSync(p).isDirectory()) {
        Lazy(model).each(function (m) {
          db[m.name] = m;
        });
      } else {
        db[model.name] = model;
      }
    });

  Object.keys(db).forEach(function(name) {
    var m = db[name];
    if (m.options.hasOwnProperty('associate')) {
      m.options.associate(db);
    }
  });

  // ---------------
  //var User      = db.User;
  //var Project   = db.Project;
  //var Currency  = db.Currency;
  //var Video     = db.Video;
  //var Reward    = db.Reward;
  //var Category  = db.Category;
  //var Photo     = db.Photo;

  //User.hasMany(Project,     { as: 'projects', foreignKey: 'user_id'      });
  //Project.hasOne(User,      { as: 'creator',  foreignKey: 'user_id'      });

  //Reward.belongsTo(Project, { as: 'project',  foreignKey: 'project_id'   });
  //Project.hasMany(Reward,   { as: 'rewards',  foreignKey: 'project_id'   });

  //Project.hasOne(Photo,     { as: 'photo',    foreignKey: 'photo_id'     });
  //Project.hasOne(Video,     { as: 'video',    foreignKey: 'video_id'     });
  //Project.hasOne(Currency,  { as: 'currency', foreignKey: 'currency_id'  });
  //Project.hasOne(Category,  { as: 'category', foreignKey: 'category_id'  });
  // ------------------

  return (Seq = Lazy({
    sequelize: sequelize,
    Sequelize: Sequelize
  }).extend(db).toObject());
};

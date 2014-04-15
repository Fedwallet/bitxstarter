/* jshint camelcase:false */

'use strict';

var MAX_PER_PAGE = 6;
var CURRENT_PAGE = 0;

module.exports = function (sequelize, DataTypes) {

  var Project = sequelize.define('Project', {

    // creator
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    // The Basics -------------------------------------------------------------
    // Required:
    //  name
    //  category
    //  blurb
    name: {
      type: DataTypes.STRING(60),
      //allowNull: false
    },

    slug: {
      type: DataTypes.STRING(255),
      //allowNull: false
    },

    // photo
    photo_id: { type: DataTypes.INTEGER },

    // category
    category_id: { type: DataTypes.INTEGER },

    // short blurb
    blurb: { type: DataTypes.STRING(135) },

    // http://stackoverflow.com/questions/1162816/naming-conventions-state-versus-status
    // http://www.computerhope.com/unix/uchmod.htm
    // http://en.wikipedia.org/wiki/Chmod
    //
    // state:
    //  DELETE                :  0      0x000000
    //  CREATE                :  1      0x000001
    //  WRITE_BASICS          :  2      0x000010
    //  WRITE_REWARDS         :  4      0x000100
    //  WRITE_STORY           :  8      0x001000
    //  WRITE_ABOUT_YOUR      : 16      0x010000
    //  WRITE_ACCOUNT         : 32      0x100000
    //  START                 : 63      0x111111
    state: { type: DataTypes.INTEGER, defaultValue: 0 },

    // full description
    description: { type: DataTypes.TEXT },

    risk: { type: DataTypes.TEXT },

    deadline: { type: DataTypes.DATE },
    launched_at: { type: DataTypes.DATE },

    backers_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    goal: { type: DataTypes.DECIMAL, defaultValue: 0 },
    pledged: { type: DataTypes.DECIMAL, defaultValue: 0 },

    // tag ids
    tag_ids: { type: DataTypes.ARRAY(DataTypes.INTEGER) },

    // currency
    currency_id: { type: DataTypes.INTEGER },

    // video
    video_id: { type: DataTypes.INTEGER },

    // location
    // location_id

    // country
    // country_id

  }, {

    tableName: 'projects',

    classMethods: {

      findByID: function (project_id) {
        return function (done) {
          Project
            .find({
              where: { id: project_id },
              include: [
                {
                  model: sequelize.model('Reward'),
                  as: 'rewards',
                  foreignKey: 'project_id'
                }
              ]
            })
            .complete(done);
        };
      },

      getPopularity: function () {
        return function (done) {
          sequelize
            .query('SELECT * FROM projects ORDER BY rank(backers_count, created_at) DESC LIMIT ' + MAX_PER_PAGE + ' OFFSET ' + CURRENT_PAGE + ';', null, { raw: true })
            .complete(done);
        };
      },

      getCreated: function (user_id) {
        return function (done) {
          sequelize
            .query('SELECT * FROM projects WHERE user_id = ' + user_id + ';', null, { raw: true, plain: true })
            .complete(done);
        };
      },

      getCreatedCount: function (user_id) {
        return function (done) {
          sequelize
            .query('SELECT count(id) AS count FROM projects WHERE user_id = ' + user_id + ';', null, { raw: true, plain: true })
            .complete(done);
        };
      },

      saveNew: function (user_id) {
        return function (done) {
          Project
            .create({ user_id: user_id })
            .complete(done);
        };
      }

    }

  });

  /*
  Project.hasOne(sequelize.daoFactoryManager.getDAO('users'), { as: 'creator', foreignKey : 'user_id' });

  Project.hasOne(sequelize.daoFactoryManager.getDAO('photos'), { as: 'photo', foreignKey : 'photo_id' });

  Project.hasOne(sequelize.daoFactoryManager.getDAO('videos'), { as: 'video', foreignKey : 'video_id' });

  Project.hasOne(sequelize.daoFactoryManager.getDAO('currencies'), { as: 'currency', foreignKey : 'currency_id' });

  Project.hasOne(sequelize.daoFactoryManager.getDAO('categories'), { as: 'category', foreignKey : 'category_id' });
  */

  return Project;

};

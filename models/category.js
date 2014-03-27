/* jshint camelcase:false */

'use strict';

/**
 *  == Schema Information
 *
 *  Table name: categories
 *
 *     Column    |           Type           |                        Modifiers
 *  -------------+--------------------------+---------------------------------------------------------
 *   id          | integer                  | not null default nextval('categories_id_seq'::regclass)
 *   name        | character varying(50)    | not null
 *   slug        | character varying(255)   | not null
 *   description | text                     |
 *   parent_id   | integer                  |
 *   position    | integer                  |
 *   created_at  | timestamp with time zone | not null
 *   updated_at  | timestamp with time zone | not null
 *   category_id | integer                  |
 *  Indexes:
 *      "categories_pkey" PRIMARY KEY, btree (id)
 *
 */

var slugify = require('../lib/utils').slugify;

module.exports = function (sequelize, DataTypes) {

  var Category = sequelize.define('Category', {

    name: { type: DataTypes.STRING(50), unique: true, allowNull: false },

    slug: { type: DataTypes.STRING(255), allowNull: false },

    description: { type: DataTypes.TEXT },

    parent_id: { type: DataTypes.INTEGER },

    position: { type: DataTypes.INTEGER }

  }, {

    tableName: 'categories',

    classMethods: {

      getTops: function () {
        return function (done) {
          Category
            .findAll({
              where: {
                parent_id: null
              },
              order: [
                ['created_at', 'ASC'],
                ['position', 'DESC']
              ],
              attributes: ['id', 'name', 'slug', 'position']
            })
            .complete(done);
        };
      },

      getTree: function () {
        return function (done) {
          sequelize
            .query(
'WITH RECURSIVE tree (id, name, parent_id, level, path) AS (SELECT c.id, c.name, c.parent_id, 1, ARRAY[c.id] FROM categories AS c WHERE parent_id IS NULL UNION ALL SELECT c.id, c.name, c.parent_id, t.level + 1, t.path || c.id FROM categories AS c JOIN tree AS t ON c.parent_id = t.id) SELECT id, name, parent_id, level, array_to_string(path, "-") AS path FROM tree ORDER BY path;', null, { raw: true })
            .complete(done);
        };
      }

    },

    instanceMethods: {

      saveNew: function () {
        this.setDataValue('slug', slugify(this.getDataValue('name')));
        return this.save();
      }

    }

  });

  Category.hasOne(Category, { foreignKey : 'parent_id' });

  return Category;

};

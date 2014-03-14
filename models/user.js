'use strict';

/**
 *  == Schema Information
 *
 *  Table name: uses
 *
 *      Column     |           Type           |                     Modifiers
 *  ---------------+--------------------------+---------------------------------------------------
 *   id            | integer                  | not null default nextval('user_id_seq'::regclass)
 *   username      | character varying(30)    | not null
 *   email         | character varying(256)   | not null
 *   password_hash | character varying(64)    | not null
 *   salt          | character varying(32)    | not null
 *   admin         | boolean                  | not null default false
 *   last_seen_at  | timestamp with time zone | not null
 *   active        | boolean
 *   name          | character varying(255)   |
 *   bio           | text                     |
 *   avatar_url    | character varying(255)   |
 *   gravatar_id   | character varying(255)   |
 *   website       | character varying(255)   |
 *   location      | character varying(255)   |
 *   company       | character varying(255)   |
 *   created_at    | timestamp with time zone | not null
 *   updated_at    | timestamp with time zone | not null
 *  Indexes:
 *      "user_pkey" PRIMARY KEY, btree (id)
 *      "user_email_key" UNIQUE CONSTRAINT, btree (email)
 *      "user_username_key" UNIQUE CONSTRAINT, btree (username)
 *
 */

var pbkdf2      = require('pbkdf2');
var pbkdf2Conf  = require('../config').pbkdf2;

var SALTLEN     = pbkdf2Conf.saltlen    || pbkdf2.saltlen;
var KEYLEN      = pbkdf2Conf.keylen     || pbkdf2.keylen;
var ALGORITHM   = pbkdf2Conf.algorithm  || pbkdf2.algorithm;
var ITERATIONS  = pbkdf2Conf.iterations || pbkdf2.iterations;

module.exports = function (sequelize, DataTypes) {

  var User = sequelize.define('User', {

    username: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false,
      validate: {
        // notIn: [[ blackList ]]
      }
    },

    email: {
      type: DataTypes.STRING(256),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },

    password_hash: { type: DataTypes.STRING(64), allowNull: false },

    salt: { type: DataTypes.STRING(32), allowNull: false },

    admin: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },

    last_seen_at: { type: DataTypes.DATE },

    active: { type: DataTypes.BOOLEAN },

    name: { type: DataTypes.STRING(255) },

    // biography
    bio: { type: DataTypes.TEXT },

    avatar_url: { type: DataTypes.STRING(255) },

    gravatar_id: { type: DataTypes.STRING(255) },

    website: { type: DataTypes.STRING(255) },

    location: { type: DataTypes.STRING(255) },

    company: { type: DataTypes.STRING(255) }

  }, {

    setterMethods: {

      email: function (v) {
        this.setDataValue('email', v.toString().trim().toLowerCase());
      }

    },

    instanceMethods: {

      hashPassword: function (p) {
        var s = pbkdf2.generateSaltSync(SALTLEN);
        this.setDataValue('salt', s);
        var password_hash = pbkdf2.hashSync(p, s, ITERATIONS, KEYLEN, ALGORITHM);
        this.setDataValue('password_hash', password_hash);
        return this;
      },

      comparePassword: function (p) {
        var s = this.getDataValue('salt');
        var password_hash = pbkdf2.hashSync(p, s, ITERATIONS, KEYLEN, ALGORITHM);
        return password_hash === this.getDataValue('password_hash');
      }

    },

    classMethods: {

      getUserByUserName: function (username, callback) {
        User.find({
          where: { username: username },
          attributes: ['id', 'username', 'email', 'name', 'bio', 'website', ['to_char("created_at", \'YYYY-MM-DD"T"HH24:MI:SS"Z"\')', 'created_at']]
        }).complete(function (err, u) {
          callback(err, u);
        });
      },

      getUserByUserNameOrEmail: function (query, callback) {
        query = query.length === 1 ? query[0] : sequelize.or(query[0], query[1]);
        User.find({
          where: query,
          attributes: ['id', 'username', 'email', 'name', 'bio', 'website', ['to_char("created_at", \'YYYY-MM-DD"T"HH24:MI:SS"Z"\')', 'created_at'], 'password_hash', 'salt']
        }).complete(function (err, u) {
          callback(err, u);
        });
      },

      saveNew: function (username, email, password, callback) {
        User.build({
          username: username,
          email:  email
        })
        .hashPassword(password)
        .save()
        .complete(function (err, u) {
          callback(err, u);
        });
      }

    },

    tableName: 'users'

  });

  return User;

};

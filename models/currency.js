'use strict';

/**
 *  == Schema Information
 *
 *  Table name: currencies
 *
 *    Column   |           Type           |                        Modifiers                        | Storage
 * ------------+--------------------------+---------------------------------------------------------+----------
 *  id         | integer                  | not null default nextval('currencies_id_seq'::regclass) | plain
 *  name       | character varying(24)    | not null                                                | extended
 *  code       | character varying(16)    | not null                                                | extended
 *  symbol     | character varying(8)     |                                                         | extended
 *  crypto     | boolean                  | not null default true                                   | plain
 *  created_at | timestamp with time zone | not null                                                | plain
 *  updated_at | timestamp with time zone | not null                                                | plain
 * Indexes:
 *     "currencies_pkey" PRIMARY KEY, btree (id)
 *     "currencies_code_key" UNIQUE CONSTRAINT, btree (code)
 *
 */

module.exports = function (sequelize, DataTypes) {

  var Currency = sequelize.define('Currency', {

    name: {
      type: DataTypes.STRING(24),
      allowNull: false
    },

    code: {
      type: DataTypes.STRING(16),
      allowNull: false,
      unique: true,
      index: true
    },

    symbol: {
      type: DataTypes.STRING(8)
    },

    crypto: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },

  }, {

    tableName: 'currencies'

  });

  return Currency;

};

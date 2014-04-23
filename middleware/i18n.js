'use strict';

/**
 *  Module dependencies.
 */

var locale = require('koa-locale');
var i18n = require('koa-i18n');

module.exports = ial;

function ial(app, opts) {
  locale(app);
  return i18n(app, opts);
}

'use strict';

var crypto = require('crypto');
var slug = require('slug');

/**
 * url slug
 */

exports.slugify = function (str) {
  return slug(str).replace(/[\(\)\*\+\\\.\'\"]/g, '').toLowerCase();
};

/**
 *  md5
 */

exports.md5 = function(str) {
  return crypto.createHash('sha1').update(str).digest('hex');
};

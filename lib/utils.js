var slug = require('slug');

/**
 * Url slug
 */

exports.slugify = function (str) {
  return slug(str).replace(/[\(\)\*\+\\\.\'\"]/g, '').toLowerCase();
};

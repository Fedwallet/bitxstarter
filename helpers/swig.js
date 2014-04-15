'use strict';

/**
 *  Filters
 */

var helpers = module.exports;

helpers.returnToPath = function (path) {
  if (path === '/' || /^\/signin/.test(path) || /^\/signup/.test(path)) {
    return '';
  }
  return path;
};

helpers.signinPath = function (path) {
  path = helpers.returnToPath(path);
  return '/signin' + (path ? '?return_to=' + encodeURIComponent(path) : '');
};

helpers.signupPath = function () {
  return '/signup';// + (path ? '?return_to=' + encodeURIComponent(path) : '');
};

helpers.signoutPath = function () {
  return '/signout';
};

helpers.categoryPath = function (category) {
  return '/discover/categories/' + category;
};

helpers.avatarPath = function (input, def, size) {
  return (input && typeof input !== 'undefined') ?
    input :
    'https://www.gravatar.com/avatar/' + def + ('?s=' + (size || 120));
};

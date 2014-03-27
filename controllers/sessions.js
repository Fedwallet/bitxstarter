'use strict';

/**
 *  Module
 */

var validator = require('validator');

/**
 *  Models
 */

var models = require('../models')();
var User = models.User;


/**
 *  Helpers
 */

function checkEmail(email) {
  return validator.isLength(email, 5, 255) &&
    validator.isEmail(email);
}

function checkUsername(username) {
  return validator.isLength(username, 1, 39) &&
    validator.matches(username, /^[a-zA-Z0-9][a-zA-Z0-9-]{0,38}$/);
}

exports['new'] = function *(next) {
  yield this.render('sessions/new');
};

exports.create = function *(next) {
  var body = this.request.body;
  var login = body.login.trim().toLowerCase();
  var password  = body.password.trim();

  if (!login || !password) {
    this.flash = { error: 'incorrect username or password' };
    yield this.render('sessions/new', { login: login });
    return;
  }

  var query = {};

  if (/@/.test(login) && checkEmail(login)) {
    query.email = login;
  } else if (checkUsername(login)) {
    query.username = login;
  } else {
    this.flash = { error: 'incorrect username or password' };
    yield this.render('sessions/new', { login: login });
    return;
  }

  var user = yield User.getUserByUserNameOrEmail(query);

  if (user && user.comparePassword(password)) {
    this.flash = { success: '登录成功！' };
    this.session.loggedIn = true;
    this.session.userId = user.id;
    this.session.user = user.values;

    // 如何扩展 `context`?
    /* jshint camelcase:false */
    this.redirect(decodeURIComponent(body.return_to) || '/');
    this.body = '<html><body>You are being <a href="' + this.location + '">redirected</a>.</body></html>';
  } else {
    this.flash = { error: 'incorrect username or password' };
    yield this.render('sessions/new', { login: login });
  }
};

exports.destory = function *(next) {
  this.session = null;
  this.redirect('/');
};

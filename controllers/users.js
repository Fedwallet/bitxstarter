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

function checkPassword(password) {
  return validator.isLength(password, 8);
}


exports.new = function *(next) {
  yield this.render('users/new');
};

exports.create = function *(next) {
  var body      = this.request.body;
  var username  = body.username.trim().toLowerCase();
  var email     = body.email.trim().toLowerCase();
  var password  = body.password.trim();

  if (!username || !email || !password) {
    this.flash = { error: '信息不完整' };
  } else if (!checkUsername(username)) {
    this.flash = { error: '仅可以使用[A-Za-z0-9-]' };
  } else if (!checkEmail(email)) {
    this.flash = { error: '邮箱地址不正确' };
  } else if (!checkPassword(password)) {
    this.flash = { error: '密码至少要8位' };
  }

  var query = {
    username: username,
    email: email
  };

  // 填写信息不正确
  if (this.flash && this.flash.error) {
    yield this.render('users/new', query);
    return;
  }

  // 添加黑名单，在此黑名单中，不得注册

  var isAlready = yield User.getUserByUserNameOrEmail(query);
  // 已经被注册了
  if (isAlready) {
    this.flash = { error: '用户名或邮箱已被使用' };
    yield this.render('users/new', query);
    return;
  }

  try {
    var user = yield User.saveNew(username, email, password);
    // 注册成功
    if (user) {
      this.flash = { success: '欢迎加入 ' + user.username + '!' };
      this.session.loggedIn = true;
      this.session.userId = user.id;
      this.session.user = user.values;

      // 如何扩展 `context`?
      /* jshint camelcase:false */
      var return_to = body.return_to;
      this.redirect((return_to && decodeURIComponent(return_to)) || '/');
      this.body = '<html><body>You are being <a href="' + this.location + '">redirected</a>.</body></html>';
    }
  } catch (e) {
    // 403?
    this.throw(403, '注册失败！');
  }
};

exports.profile = function *(next) {
  var username = this.params.username;

  if (checkUsername(username)) {
    var user = yield User.getUserByUserName(username);
    if (user) {
      // tabs: backed created activity
      var tab = this.query.tab || 'backed';
      var currentUser = this.locals.currentUser;

      yield this.render('users/profile', {
        tab: tab.toLowerCase(),
        isCurrentUser: (currentUser && currentUser.id) === user.id,
        user: user
      });
      return;
    }
  }
  this.throw(404);
};

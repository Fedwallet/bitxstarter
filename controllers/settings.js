'use strict';

/**
 *  Models
 */

var models = require('../models')();
var User = models.User;

exports.profile = function *(next) {
  yield this.render('settings/profile');
};

exports.account = function *(next) {
  yield this.render('settings/account');
};

exports.password = function *(next) {
  yield this.render('settings/password');
};

exports.notifications = function *(next) {
  yield this.render('settings/notifications');
};

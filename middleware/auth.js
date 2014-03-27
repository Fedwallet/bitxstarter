
'use strict';

/**
 *  Module dependencies.
 */

var debug = require('debug')('bit:auth');

module.exports = function *auth(next) {
  var session = yield this.session;
  debug('%s, %s, %j', this.url, this.sessionId, session);
  this.user = {};

  if (session.username) {
    this.user.username = session.username;
    // admin
    debug('auth exists user: %j, headers: %j', this.user, this.header);
  }

  yield next;
};

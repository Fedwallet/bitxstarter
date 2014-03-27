'use strict';

var session     = require('koa-sess');
var RedisStore  = require('koa-redis');
var config      = require('../config');

var cookie = {
  path: '/',
  httpOnly: true,
  maxAge: 3600000 * 24 * 365,
  signed: !true
};

var key = '';//'bit_sid';
var options = {
  key: key,
  cookie: cookie,
  secret: config.sessionSecret
};

if (!config.debug) {
  options.store = config.sessionStore || new RedisStore(config.session);
}

module.exports = session(options);

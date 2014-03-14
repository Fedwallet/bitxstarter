'use strict';

var session     = require('koa-sess');
var RedisStore  = require('koa-redis');
var config      = require('../config');

var key = 'bit_sid';
var cookie = {
  path: '/',
  httpOnly: true,
  maxAge: 3600000 * 24 * 365,
  signed: false
};
var options = {
  key: key,
  cookie: cookie,
  secret: config.sessionSecret
};

if (!config.debug) {
  options.store = config.sessionStore || RedisStore(config.session);
}

module.exports = session(options);

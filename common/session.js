'use strict';

var session     = require('koa-sess');
var RedisStore  = require('koa-redis');
var config      = require('../config');

var key = 'bit-sid';
var cookie = {
  path: '/',
  httpOnly: true,
  maxAge: 3600000 * 24 * 365,
  signed: false
};
var options = {
  key: key,
  cookie: cookie,
};

if (!config.debug) {
  options.store = config.sessionStore || middlewares.RedisStore(config.redis);
}

module.exports = session(options);

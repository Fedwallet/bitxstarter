'use strict';

/**
 *  Module dependencies.
 */

var path  = require('path');
var env   = process.env;
var pkg   = require('../package');

var NODE_ENV  = env.NODE_ENV || 'development';
var isProd    = NODE_ENV === 'production';

var postgre = require('./database')[NODE_ENV];
var session = require('./session')[NODE_ENV];

var root = path.dirname(__dirname);

var config = Object.freeze({
  env           : NODE_ENV,
  version       : pkg.version,
  debug         : true,
  isProduction  : isProd,
  isDevelopment : !isProd,
  port          : env.PORT || 3000,

  postgre       : postgre,
  session       : session,
  sessionSecret : 'bitstart test session secret'
});

module.exports = config;

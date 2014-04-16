'use strict';

/**
 *  Module dependencies.
 */

var env   = process.env;
var pkg   = require('../package');

var NODE_ENV  = env.NODE_ENV || 'development';
var isProd    = NODE_ENV === 'production';

var postgre = require('./database')[NODE_ENV];
var session = require('./session')[NODE_ENV];

var config = Object.freeze({
  env           : NODE_ENV,
  version       : pkg.version,
  debug         : true,
  isProduction  : isProd,
  isDevelopment : !isProd,
  port          : env.PORT || 3000,

  postgre       : postgre,
  session       : session,
  sessionSecret : 'bitxstarter test session secret',

  // https://www.owasp.org/index.php/Password_Storage_Cheat_Sheet
  pbkdf2    : {
    keylen    : 64,
    saltlen   : 32,
    algorithm : 'sha256',
    iterations: isProd ? 6400 : 10
  }
});

module.exports = config;

'use strict';

/**
 *  Module dependencies.
 */

var path        = require('path');
var koa         = require('koa');
var logger      = require('koa-logger');
var staticCache = require('koa-static-cache');
var bodyParser  = require('koa-bodyparser');
var router      = require('koa-router');
var microtime   = require('microtime');
var xrt         = require('koa-rt');  // X-Response-Time
var session     = require('../common/session');
var notFound    = require('../middleware/notfound');
var routes      = require('../routes/web');

var app     = koa();

var config  = require('../config')

var rootdir = path.dirname(__dirname);

app.use(xrt({timer: microtime}));
app.use(staticCache(path.join(__dirname, '..', 'public'), {
  buffer: !config.debug,
  maxAge: config.debug ? 0 : 60 * 60 * 24 * 7,
  dir: path.join(rootdir, 'public')
}));

app.outputErrors = true;
app.proxy = true;

app.use(session);
app.use(bodyParser());
app.use(notFound);

/**
 *  Routes
 */

app.use(router(app));
routes(app);

app = http.createServer(app.callback());

if (!module.parent) {
  app.listen(config.port);
}

module.exports = app;

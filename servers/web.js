'use strict';

/**
 *  Module dependencies.
 */

var http        = require('http');
var path        = require('path');
var koa         = require('koa');
var microtime   = require('microtime');
var session     = require('../common/session');
var routes      = require('../routes/web');
var middles     = require('../middleware');

var app     = koa();

var config  = require('../config');
var db      = require('../models')();

var rootdir = path.dirname(__dirname);

app.use(middles.logger());
app.use(middles.xrt({timer: microtime}));
app.use(middles.staticCache(path.join(__dirname, '..', 'public'), {
  buffer: !config.debug,
  maxAge: config.debug ? 0 : 60 * 60 * 24 * 7,
  dir: path.join(rootdir, 'public')
}));

app.keys = ['keys', 'keykeys'];
app.name = 'bitstarter';
app.outputErrors = true;
app.proxy = true;

middles.locals(app, {
  site: {
    title: 'BitAppStore',
    name: 'Bitstarter'
  }
});

app.use(middles.favicon());
app.use(middles.bodyParser());
app.use(middles.methodOverride());
app.use(session);
app.use(middles.auth);
app.use(middles.cure({
  csrf: true
}));
app.use(function *loggedIn(next) {
  this.locals._csrf = this.csrf;
  this.locals.loggedIn = this.session.loggedIn;
  this.locals.currentUser = this.session.user;
  yield next;
});
app.use(middles.flash(app));

app.use(middles.notFound);

/**
 *  Swig Render
 */

var viewsdir = path.join(rootdir, 'views');

middles.render(app, {
  cache: false,
  root: viewsdir,
  ext: 'html'
});

/**
 *  Routes
 */

app.use(middles.router(app));
routes(app);

app.on('error', function(err, ctx){
  //log.error('server error', err, ctx);
});

app = http.createServer(app.callback());

if (!module.parent) {
  require('pretty-error').start(function() {
    app.listen(config.port);
    console.log('127.0.0.1:' + config.port);
  });
}

db
  .sequelize
  .sync({ force: false })
  .complete(function(err) {
    if (err) {
      throw err;
    } else {
      console.log('Postgres connected.');
    }
  });

module.exports = app;

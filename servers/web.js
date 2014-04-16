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
app.name = 'bitxstarter';
app.outputErrors = true;
//app.proxy = true;

middles.locals(app, {
  site: {
    title: 'BitXStarter',
    name: 'BitXStarter'
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
  /* jshint camelcase:false */
  this.locals._csrf = this.csrf;
  var path = this.query.return_to || this.request.path;
  this.locals.returnTo = (path === '/' || /^\/signin/.test(path) || /^\/signup/.test(path)) ? null : path;
  this.locals.loggedIn = this.session.loggedIn;
  this.locals.currentUser = this.session.user;
  yield next;
});
app.use(middles.flash(app));
app.use(middles.i18n(app, {
  directory: rootdir + '/config/locales',
  locales: ['zh-CN', 'en']
}));

app.use(middles.notFound);

/**
 *  Swig Render
 */

var viewsdir = path.join(rootdir, 'views');

middles.render(app, {
  cache: false,
  root: viewsdir,
  ext: 'html',
  filters: require('../helpers/swig')
});

/**
 *  Routes
 */

app.use(middles.router(app));
routes(app);

// TODO: storing logs
app.on('error', function(err, ctx){
  console.log('server error', err, ctx);
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

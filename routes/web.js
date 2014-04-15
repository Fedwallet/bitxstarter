
'use strict';

/**
 *  Module dependencies.
 */

var site = r('site');
var sessions = r('sessions');
var users = r('users');
var projects = r('projects');

/**
 *  Helpers
 */

function r(ctrler) {
  return require('../controllers/' + ctrler);
}

function routes(app) {

  /**
   *  REST style, Action mappings
   *
   *  Action |  Method |  Route
   *  ------------------------------
   *  index  |  GET    |  /users
   *  new    |  GET    |  /users/new
   *  create |  POST   |  /users
   *  show   |  GET    |  /users/:id
   *  edit   |  GET    |  /users/:id/edit
   *  update |  PATCH  |  /users/:id
   *  update |  PUT    |  /users/:id
   *  destory|  DELETE |  /users:/id
   */

  app.get('/', site.show);

  app.get('/signin', sessions.new);
  app.post('/signin', sessions.create);
  app.delete('/signout', sessions.destory);

  app.get('/signup', users.new);
  app.post('/signup', users.create);
  app.get('/@:username', users.profile);

  app.get('/discover', projects.index);
  app.get('/start', projects.start);
  app.get('/projects/guidelines', authenticate, projects.new);
  app.post('/projects/new', projects.create);
}

module.exports = routes;

function *authenticate(next) {
  /*jshint validthis:true */
  if (this.session.loggedIn) {
    return yield next;
  }
  var path = this.path;
  this.redirect('/signin' + (path ? '?return_to=' + path : ''));
}

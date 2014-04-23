
module.exports = {
  logger          : require('koa-logger'),
  favicon         : require('koa-favicon'),
  staticCache     : require('koa-static-cache'),
  bodyParser      : require('koa-bodyparser'),
  router          : require('koa-router'),
  xrt             : require('koa-rt'),  // X-Response-Time
  locals          : require('koa-locals'),
  render          : require('koa-swig'),
  cure            : require('koa-cure'),
  methodOverride  : require('koa-methodoverride'),
  flash           : require('koa-flash'),
  auth            : require('./auth'),
  i18n            : require('./i18n'),
  notFound        : require('./notfound')
};

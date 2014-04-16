'use strict';

module.exports = function *notFound(next) {
  yield next;

  if (this.status) return;

  this.status = 404;
  this.type = 'text';
  this.body = 'Not found';
};

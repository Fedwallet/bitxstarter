
'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('koa:flash');
var util = require('util');
var format = util.format;
var isArray = util.isArray;
var slick = [].slice;

module.exports = function (app) {

  return function *flash(next) {
    this.flash = this.request.flash = _flash.bind(this);
    yield next;
  };
};

function _flash(type, msg) {
  debug('flash.%s %s', type, msg);
  var session = this.session;
  if (!session) this.throw('req.flash() requires sessions');
  var msgs = session.flash = session.flash || {};
  if (type && msg) {
    if (arguments.length > 2) {
      var args = slice.call(arguments, 1);
      msg = format.apply(null, args);
    } else if (isArray(msg)) {
        msg.forEach(function (val) {
          (msgs[type] = msgs[type] || []).push(val)
        });
        return msgs[type].length;
      }
    return (msgs[type] = msgs[type] || []).push(msg);
  } else if (type) {
    var arr = msgs[type];
    delete msgs[type];
    return arr || [];
  } else {
    session.flash = {};
    return msgs;
  }
}

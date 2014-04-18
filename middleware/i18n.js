
'use strict';

/**
 *  Module dependencies.
 */

var debug = require('debug')('koa:i18n');
var locale = require('koa-locale');
var I18n = require('i18n-2');

module.exports = function (app, opts) {

  locale(app);

  /**
   *  Lazily creates an i18n.
   *
   *  @api public
   */

  app.context.__defineGetter__('i18n', function () {
    if (this._i18n) {
      return this._i18n;
    }

    this._i18n = new I18n(opts);

    if (this.locals) {
      registerMethods(this.locals, this._i18n);
    }

    debug('app.ctx.i18n %j', this._i18n);

    return this._i18n;
  });

  app.request.__defineGetter__('i18n', function () {
    return this.ctx.i18n;
  });

  return function *i18n(next) {
    var locale = this.getLocaleFromHeader();
    if (locale) {
      if (!this.i18n.locales[locale]) {
        var parts = locale.split('-');
        locale = parts[0];
        if (!this.i18n.locales[locale]) {
          locale = null;
        }
      }
      if (locale) {
        this.i18n.setLocale(locale);
      }
    }
    yield *next;
  };
};

/**
 *  register methods
 */

function registerMethods(helpers, i18n) {
  I18n.resMethods.forEach(function (method) {
    helpers[method] = i18n[method].bind(i18n);
  });
  return helpers;
}

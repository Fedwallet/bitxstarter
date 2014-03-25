var Lazy = require('lazy.js');

var _default = {
  host: '127.0.0.1',
  port: 16379,
};

module.exports = {
  development: _default,

  test: _default,

  production: Lazy(_default).merge({
    port: 6379
  }).toObject()
};

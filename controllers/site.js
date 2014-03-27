'use strict';

exports.show = function *(next) {
  yield this.render('index');
};


exports.show = function *(next) {
  yield this.render('sessions/new', {
    authenticity_token: this.csrf
  });
};

exports.create = function *(next) {
  //var body = this.request.body;
  console.log(this.request.body);

  this.body = this.request.body;
};

exports.destory = function *(next) {
};

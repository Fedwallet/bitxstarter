
exports.show = function *(next) {
  yield this.render('users/new', {
    authenticity_token: this.csrf
  });
};

exports.create = function *(next) {
  var body      = this.request.body;
  var username  = body.username.trim().toLowerCase();
  var email     = body.email.trim().toLowerCase();
  var password  = body.password.trim();

  this.body = body;
};

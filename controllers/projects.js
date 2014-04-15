
'use strict';

/**
 *  Models
 */

var models = require('../models')();
var Category = models.Category;
var Project = models.Project;

exports.index = function *(next) {

  var categories = yield Category.getTops();
  var popularProjects = yield Project.getPopularity();

  yield this.render('projects/index', {
    categories: categories,
    popularProjects: popularProjects
  });
};


exports.start = function *(next) {

  var categories = yield Category.getTops();

  yield this.render('projects/start', {
    categories: categories
  });
};

exports.new = function *(next) {
  yield this.render('projects/new', {});
};

exports.create = function *(next) {
};

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _primap = _interopRequireDefault(require("primap"));

var _BlogController = _interopRequireDefault(require("../controller/BlogController"));

var _BlogPostRoute = _interopRequireDefault(require("./BlogPostRoute"));

class BlogHomeRoute extends _BlogPostRoute.default {
  constructor(path, request, params) {
    super(path, request, params);
  }

  getController(config) {
    return new _BlogController.default(config);
  }

  getAction() {
    return 'home';
  }

  getParams() {
    return {
      posts: this.validPostSlugList
    };
  }

  matches(req) {
    req = req || this.request;
    const {
      url,
      method
    } = req;
    return method === 'GET' && this.path === url;
  }

  isValid(req) {
    return true;
  }

}

var _default = BlogHomeRoute;
exports.default = _default;
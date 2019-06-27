"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BlogController = _interopRequireDefault(require("../controller/BlogController"));

var _BaseRoute = _interopRequireDefault(require("./BaseRoute"));

class BlogPostRoute extends _BaseRoute.default {
  constructor(path, request, params) {
    super(path, request, params);
    this.validPostSlugList = params.validPostSlugListGetter();
  }

  getController(config) {
    return new _BlogController.default(config);
  }

  getAction() {
    return 'post';
  }

  getParams() {
    return {
      postSlug: this.getRequestedPostSlug()
    };
  }

  matches(req) {
    req = req || this.request;
    const {
      url,
      method
    } = req;
    return method === 'GET' && url.indexOf(this.path) === 0;
  }

  isValid(req) {
    return this.validPostSlugList.indexOf(this.getRequestedPostSlug(req)) >= 0;
  }

  getRequestedPostSlug(req) {
    req = req || this.request;
    const [, postSlug] = req.url.split(this.path);
    return postSlug;
  }

}

var _default = BlogPostRoute;
exports.default = _default;
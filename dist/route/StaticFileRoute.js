"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseRoute = _interopRequireDefault(require("./BaseRoute"));

var _StaticFileController = _interopRequireDefault(require("../controller/StaticFileController"));

class StaticFileRoute extends _BaseRoute.default {
  constructor(path, request, params) {
    super(path, request, params);
    this.staticFilePaths = params.staticFilePathsGetter();
  }

  getController(config) {
    return new _StaticFileController.default(config);
  }

  getAction() {
    return 'index';
  }

  getParams() {
    return {
      filepath: this.getRequestedFilepath().substring('/'.length)
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
    return this.staticFilePaths.indexOf(this.getRequestedFilepath(req)) >= 0;
  }

  getRequestedFilepath(req) {
    req = req || this.request;
    return req.url;
  }

}

var _default = StaticFileRoute;
exports.default = _default;
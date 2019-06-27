"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _primap = _interopRequireDefault(require("primap"));

var _BaseRoute = _interopRequireDefault(require("./BaseRoute"));

var _NotFoundController = _interopRequireDefault(require("../controller/NotFoundController"));

class NotFoundRoute extends _BaseRoute.default {
  constructor(path, request, params) {
    super(path, request, params);
  }

  getController(config) {
    return new _NotFoundController.default(config);
  }

  getAction() {
    return 'index';
  }

  getParams() {
    return {};
  }

  matches(req) {
    return true;
  }

  isValid(req) {
    return true;
  }

}

var _default = NotFoundRoute;
exports.default = _default;
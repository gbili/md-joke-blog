"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _BaseController = _interopRequireDefault(require("./BaseController"));

class NotFoundController extends _BaseController.default {
  constructor(config) {
    super(config);
  }

  indexAction() {
    this.response.code = 404;
    this.response.headers = {
      'Content-Type': 'text/plain; charset=utf-8'
    };
    this.response.body = '404 Not Found.';
    return this.response;
  }

}

var _default = NotFoundController;
exports.default = _default;
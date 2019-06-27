"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _mimeTypes = _interopRequireDefault(require("mime-types"));

var _BaseController = _interopRequireDefault(require("./BaseController"));

class StaticFileController extends _BaseController.default {
  constructor(config) {
    super(config);
  }

  indexAction({
    filepath
  }) {
    const staticFilesDir = typeof this.config.staticFilesDir !== 'undefined' ? this.config.staticFilesDir : `${__dirname}/../../static`;
    filepath = `${staticFilesDir}/${filepath}`;
    return new Promise(function (resolve, reject) {
      _fs.default.readFile(filepath, 'utf-8', function (err, rawContents) {
        if (err) return reject(err);
        return resolve(rawContents);
      });
    }).then(function (rawContents) {
      const mimeType = _mimeTypes.default.lookup(filepath);

      this.response.code = 200;
      this.response.headers = {
        'content-type': `${_mimeTypes.default.contentType(mimeType)}; charset=${_mimeTypes.default.charset(mimeType)}`
      };
      this.response.body = rawContents;
      return this.response;
    }.bind(this)).catch(this.handleError);
  }

}

var _default = StaticFileController;
exports.default = _default;
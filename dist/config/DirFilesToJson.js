"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _recursiveReaddir = _interopRequireDefault(require("recursive-readdir"));

class DirFilesToJson {
  constructor({
    sourceDir,
    destFile
  }) {
    this.sourceDir = sourceDir;
    this.destFile = destFile;
    this.readFilesListPromise = this.readFilesListPromise.bind(this);
    this.writeJsonFilePromise = this.writeJsonFilePromise.bind(this);
  }

  readFilesListPromise(recrusiveRead) {
    const readingFunction = recrusiveRead ? _recursiveReaddir.default : _fs.default.readdir;
    return new Promise(function (resolve, reject) {
      readingFunction(this.sourceDir, (err, files) => {
        if (err) reject(err);
        resolve(files);
      });
    }.bind(this));
  }

  writeJsonFilePromise(files) {
    const filesListAsJsonString = JSON.stringify(files);
    const fileContents = this.destFile.split('.').pop() === 'json' ? filesListAsJsonString : `export default ${filesListAsJsonString};`;
    return new Promise(function (resolve, reject) {
      _fs.default.writeFile(this.destFile, fileContents, function (err) {
        if (err) reject(err);
        resolve(this.destFile);
      }.bind(this));
    }.bind(this));
  }

  generate(onSuccess, onFail, recrusiveRead) {
    recrusiveRead = typeof recrusiveRead === 'boolean' ? recrusiveRead : true;
    if (typeof onSuccess === 'undefined') onSuccess = function (writtenFilePath) {};
    if (typeof onFail === 'undefined') onFail = function (err) {};
    this.readFilesListPromise(recrusiveRead).then(this.writeJsonFilePromise).then(onSuccess).catch(onFail);
  }

}

var _default = DirFilesToJson;
exports.default = _default;
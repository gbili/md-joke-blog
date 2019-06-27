#!/usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _DirFilesToJson = _interopRequireDefault(require("./DirFilesToJson"));

var _global = _interopRequireDefault(require("../../config-dist/global"));

const recursive = true;
const blogPostsJson = new _DirFilesToJson.default({
  sourceDir: _global.default.mdBlogPostsDir,
  destFile: `${_global.default.compiledUserContentDir}/post-list.json`
});
blogPostsJson.generate(function (file) {
  console.log('Blog post list written ', file);
}, function (err) {
  console.log(err);
}, !recursive);
const staticFilesJson = new _DirFilesToJson.default({
  sourceDir: _global.default.staticFilesDir,
  destFile: `${_global.default.compiledUserContentDir}/static-file-list.json`
});
staticFilesJson.generate(function (file) {
  console.log('Static file list written ', file);
}, function (err) {
  console.log(err);
}, recursive);
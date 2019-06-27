"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Router", {
  enumerable: true,
  get: function () {
    return _Router.default;
  }
});
Object.defineProperty(exports, "config", {
  enumerable: true,
  get: function () {
    return _global.default;
  }
});
exports.default = void 0;

var _http = _interopRequireDefault(require("http"));

var _fs = _interopRequireDefault(require("fs"));

var _Router = _interopRequireDefault(require("./route/Router.js"));

var _global = _interopRequireDefault(require("../config-dist/global"));

const port = process.env.port || 1337;

const app = _http.default.createServer(async function (req, res) {
  const response = await new _Router.default(_global.default).resolve(req);

  if (response) {
    res.writeHead(response.code, response.headers);
    res.end(response.body);
    return;
  }
});

app.listen(port);
console.log(`Listening on : http://localhost:${port}`);
var _default = app;
exports.default = _default;
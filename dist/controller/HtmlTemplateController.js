"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _BaseController = _interopRequireDefault(require("./BaseController"));

var _mostachito = _interopRequireDefault(require("mostachito"));

class HtmlTemplateController extends _BaseController.default {
  constructor(config) {
    super(config);
    this.loadViewTemplate = this.loadViewTemplate.bind(this);
    this.hydrateView = this.hydrateView.bind(this);
  }

  getViewBaseName() {
    const fullName = this.constructor.name;
    return fullName.substring(0, fullName.length - 'Controller'.length).toLowerCase();
  }

  loadViewTemplate(viewData) {
    const viewsPath = typeof this.config.viewsPath !== 'undefined' ? this.config.viewsPath : `${__dirname}/../view`;
    const filepath = `${viewsPath}/${this.getViewBaseName()}-${this.action}.html`;
    return new Promise(function (resolve, reject) {
      _fs.default.readFile(filepath, 'utf-8', function (err, viewTemplate) {
        if (err) return reject(err);
        resolve({
          viewTemplate,
          viewData
        });
      });
    });
  }

  hydrateView({
    viewTemplate,
    viewData
  }) {
    const configViewData = this.config.viewData || {};
    viewData = { ...configViewData,
      ...viewData
    };
    const mostachito = new _mostachito.default(this.config.missingRefValueReplacement);
    const hydratedView = mostachito.hydrate(viewTemplate, viewData);
    this.response.code = 200;
    this.response.headers = {
      'content-type': 'text/html; charset=utf-8'
    };
    this.response.body = hydratedView;
    return this.response;
  }

}

var _default = HtmlTemplateController;
exports.default = _default;
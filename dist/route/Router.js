"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _primap = _interopRequireDefault(require("primap"));

class Router {
  constructor(config) {
    _primap.default.bind(this);

    (0, _primap.default)().config = config;

    (0, _primap.default)().instantiateRoutes = function (request, routesConfig) {
      return routesConfig.map(({
        path,
        route,
        params
      }) => {
        return new route(path, request, params);
      });
    };
  }

  resolve(request) {
    const routes = (0, _primap.default)().instantiateRoutes(request, (0, _primap.default)().config.routes);
    const capableRoutes = routes.filter(route => route.canResolve(request));

    if (capableRoutes.length <= 0) {
      return false;
    }

    const route = capableRoutes.shift();
    const controller = route.getController((0, _primap.default)().config);
    const disparams = {
      action: route.getAction(),
      params: route.getParams()
    };
    const response = controller.dispatch(disparams);
    return response;
  }

}

var _default = Router;
exports.default = _default;
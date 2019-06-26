import _p from 'primap';

class Router {
  constructor(config) {
    _p.bind(this);
    _p().config = config;
    _p().instantiateRoutes = function(request, routesConfig) {
      return routesConfig.map(({path, route, params}) => {
        return new (route)(path, request, params);
      });
    };
  }

  resolve(request) {

    const routes = _p().instantiateRoutes(request, _p().config.routes);

    const capableRoutes = routes.filter(route => route.canResolve(request));

    if (capableRoutes.length <= 0) {
      return false;
    }

    const route = capableRoutes.shift();

    const controller = route.getController(_p().config);
    const disparams = {
      action: route.getAction(),
      params: route.getParams(),
    };

    const response = controller.dispatch(disparams);

    return response;
  }
}

export default Router;

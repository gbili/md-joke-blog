import _p from 'primap';

class Router {
  constructor() {
    _p.bind(this);
    _p().instantiateRoutes = function(request, routesConfig) {
      return routesConfig.map(({path, route, params}) => {
        return new (route)(path, request, params);
      });
    };
  }

  resolve(request, routesConfig) {
    const routes = _p().instantiateRoutes(request, routesConfig);

    const capableRoutes = routes.filter(route => route.canResolve(request));

    if (capableRoutes.length <= 0) {
      return false;
    }

    const route = capableRoutes.shift();

    const controller = route.getController(config);
    const disparams = {
      action: route.getAction(),
      params: route.getParams(),
    };

    const response = controller.dispatch(disparams);

    return response;
  }
}

export default Router;

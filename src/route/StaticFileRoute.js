import BaseRoute from './BaseRoute';
import StaticFileController from '../controller/StaticFileController';

class StaticFileRoute extends BaseRoute {
  constructor(path, request, params) {
    super(path, request, params);
    ({ staticFilePaths:this.staticFilePaths } = params);
  }

  getController(config) {
    return new StaticFileController(config);
  }

  getAction() {
    return 'index';
  }

  getParams() {
    return {
      filepath: this.getRequestedFilepath().substring('/'.length),
    };
  }

  matches(req) {
    req = req || this.request;
    const { url, method } = req;
    return method === 'GET'
      && url.indexOf(this.path) === 0;
  }

  isValid(req) {
    return this.staticFilePaths.indexOf(this.getRequestedFilepath(req)) >= 0;
  }

  getRequestedFilepath(req) {
    req = req || this.request;
    return req.url;
  }
}

export default StaticFileRoute;

import _p from 'primap';
import BaseRoute from './BaseRoute';
import NotFoundController from '../controller/NotFoundController';

class NotFoundRoute extends BaseRoute {
  constructor(path, request, params) {
    super(path, request, params);
  }

  getController(config) {
    return new NotFoundController(config);
  }

  getAction() {
    return 'index';
  }

  getParams() {
    return {};
  }

  matches(req) {
    return true;
  }

  isValid(req) {
    return true;
  }
}

export default NotFoundRoute;

import fs from 'fs';
import BaseController from './BaseController';

class NotFoundController extends BaseController {
  constructor(config) {
    super(config);
  }

  indexAction() {
    this.response.code = 404;
    this.response.headers = {'Content-Type': 'text/plain; charset=utf-8'};
    this.response.body = '404 Not Found.';
    return this.response;
  }
}

export default NotFoundController;

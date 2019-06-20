import BlogController from '../controller/BlogController';
import BaseRoute from './BaseRoute'

class BlogRoute extends BaseRoute {
  constructor(path, request, params) {
    super(path, request, params);
    ({ validPostNames: this.validPostNames } = params);
  }

  getController() {
    return new BlogController();
  }

  getAction() {
    return 'post';
  }

  getParams() {
    return {
      postName: this.getRequestedPostName(),
    };
  }

  matches(req) {
    req = req || this.request;
    const { url, method } = req;
    return method === 'GET'
      && url.indexOf(this.path) === 0;
  }

  isValid(req) {
    return this.validPostNames.indexOf(this.getRequestedPostName(req)) >= 0;
  }

  getRequestedPostName(req) {
    req = req || this.request;
    const [, postName] = req.url.split(this.path);
    return postName;
  }
}

export default BlogRoute;

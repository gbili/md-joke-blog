import _p from 'primap';
import BlogController from '../controller/BlogController';
import BlogRoute from './BlogRoute'

class BlogHomeRoute extends BlogRoute {
  constructor(path, request, params) {
    super(path, request, params);
  }

  getController() {
    return new BlogController();
  }

  getAction() {
    return 'home';
  }

  getParams() {
    return {
      content: this.validPostNames.join(', '),
    };
  }

  matches(req) {
    req = req || this.request;
    const { url, method } = req;
    return method === 'GET'
      && this.path === url;
  }

  isValid(req) {
    return true;
  }
}

export default BlogHomeRoute;

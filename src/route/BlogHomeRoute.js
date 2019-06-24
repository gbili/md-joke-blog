import _p from 'primap';
import BlogController from '../controller/BlogController';
import BlogPostRoute from './BlogPostRoute';

class BlogHomeRoute extends BlogPostRoute {
  constructor(path, request, params) {
    super(path, request, params);
  }

  getController(config) {
    return new BlogController(config);
  }

  getAction() {
    return 'home';
  }

  getParams() {
    return {
      content: this.validPostsSlugList.join(', '),
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

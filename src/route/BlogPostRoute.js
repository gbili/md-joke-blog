import BlogController from '../controller/BlogController';
import BaseRoute from './BaseRoute'

class BlogPostRoute extends BaseRoute {
  constructor(path, request, params) {
    super(path, request, params);
    ({ validPostSlugList: this.validPostSlugList } = params);
  }

  getController() {
    return new BlogController();
  }

  getAction() {
    return 'post';
  }

  getParams() {
    return {
      postSlug: this.getRequestedPostSlug(),
    };
  }

  matches(req) {
    req = req || this.request;
    const { url, method } = req;
    return method === 'GET'
      && url.indexOf(this.path) === 0;
  }

  isValid(req) {
    return this.validPostSlugList.indexOf(this.getRequestedPostSlug(req)) >= 0;
  }

  getRequestedPostSlug(req) {
    req = req || this.request;
    const [, postSlug] = req.url.split(this.path);
    return postSlug;
  }
}

export default BlogPostRoute;

import BlogRoute from '../src/route/BlogRoute';
import BlogHomeRoute from '../src/route/BlogHomeRoute';
import StaticFileRoute from '../src/route/StaticFileRoute';
import NotFoundRoute from '../src/route/NotFoundRoute';

const routerConfig = {
  routes: [
    // post route
    {
      path: '/', 
      route: BlogRoute,
      params: {
        validPostNames: ['my-blog-post'],
      }
    },
    // main 
    {
      path: '/',
      route: BlogHomeRoute,
      params: {
        validPostNames: ['my-blog-post'],
      }
    },
    {
      path: '/css/',
      route: StaticFileRoute,
      params: {
        staticFilePaths: ['/css/prism.css'],
      }
    },
    {
      path: '*',
      route: NotFoundRoute,
      params: {}
    },
  ],
};

export default routerConfig;

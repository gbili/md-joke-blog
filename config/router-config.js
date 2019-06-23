import BlogPostRoute from '../src/route/BlogPostRoute';
import BlogHomeRoute from '../src/route/BlogHomeRoute';
import StaticFileRoute from '../src/route/StaticFileRoute';
import NotFoundRoute from '../src/route/NotFoundRoute';
import postList from './post-list';

const validPostSlugList = postList.map(fileName => fileName.split('.').shift());

const routerConfig = {
  routes: [
    // post route
    {
      path: '/', 
      route: BlogPostRoute,
      params: {
        validPostSlugList,
      }
    },
    // main 
    {
      path: '/',
      route: BlogHomeRoute,
      params: {
        validPostSlugList,
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

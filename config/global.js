import { resolve } from 'path';
import BlogPostRoute from '../src/route/BlogPostRoute';
import BlogHomeRoute from '../src/route/BlogHomeRoute';
import StaticFileRoute from '../src/route/StaticFileRoute';
import NotFoundRoute from '../src/route/NotFoundRoute';
import postList from './post-list';
import staticFileList from './static-file-list';
import dir from './dir';

const validPostSlugList = postList.map(fileName => fileName.split('.').shift());
const relativeStaticFileList = staticFileList.map(fullPath => fullPath.split(resolve(dir.staticFilesDir)).pop());

const config = {
  viewData: {
    siteTitle: 'Guillermo.at',
  },
  ...dir,
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
        staticFilePaths: relativeStaticFileList,
      }
    },
    {
      path: '*',
      route: NotFoundRoute,
      params: {}
    },
  ],
};

export default config;

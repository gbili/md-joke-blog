import { resolve } from 'path';
import BlogPostRoute from '../dist/route/BlogPostRoute';
import BlogHomeRoute from '../dist/route/BlogHomeRoute';
import StaticFileRoute from '../dist/route/StaticFileRoute';
import NotFoundRoute from '../dist/route/NotFoundRoute';
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
    {
      path: '/', 
      route: BlogPostRoute,
      params: {
        validPostSlugList,
      }
    },
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

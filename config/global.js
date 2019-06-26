import { resolve } from 'path';
import BlogPostRoute from '../dist/route/BlogPostRoute';
import BlogHomeRoute from '../dist/route/BlogHomeRoute';
import StaticFileRoute from '../dist/route/StaticFileRoute';
import NotFoundRoute from '../dist/route/NotFoundRoute';

let userConfig = {};
try {
  const userCustomConfigPath = `${__dirname}/../../../md-joke-blog.config.js`;
  userConfig = require(userCustomConfigPath).default
} catch (err) {
  console.log('You can customize the config by creating a md-joke-blog.config.js in your repo');
  console.log('Will be using default config...');
}

const config = {};

// load the hello world fake content
config.mdBlogPostsDir = `${__dirname}/../content`
config.staticFilesDir = `${__dirname}/../static`
config.viewData = {
  siteTitle: 'Markdown Joke Blog',
};

config.compiledUserContentDir = userConfig.compiledUserContentDir || `${__dirname}/../compiled_user_content`
config.viewsDir = userConfig.viewsDir || `${__dirname}/../dist/view`

const validPostSlugListGetter = (function () {
  const compiledUserContentDir = config.compiledUserContentDir;
  return function () {
    const postList = require(`${compiledUserContentDir}/post-list`);
    return postList.map(fileName => fileName.split('.').shift());
  };
})();

const relativeStaticFileListGetter = (function () {
  const staticFilesDir = config.staticFilesDir;
  return function () {
    const staticFileList = require(`${config.compiledUserContentDir}/static-file-list`);
    return staticFileList.map(fullPath => fullPath.split(resolve(staticFilesDir)).pop());
  };
})();

config.routes = [
  {
    path: '/',
    route: BlogPostRoute,
    params: {
      validPostSlugListGetter,
    }
  },
  {
    path: '/',
    route: BlogHomeRoute,
    params: {
      // a list of post filenames without the full path
      validPostSlugListGetter,
    }
  },
  {
    path: '/css/',
    route: StaticFileRoute,
    params: {
      // a list of absolute path static files names
      staticFilePathsGetter: relativeStaticFileListGetter,
    }
  },
  {
    path: '*',
    route: NotFoundRoute,
    params: {}
  },
];

if (process.env.MJB_ENV === 'production') {
  config.mdBlogPostsDir = userConfig.mdBlogPostsDir || `${__dirname}/../../../content`
  config.staticFilesDir = userConfig.staticFilesDir || `${__dirname}/../../../static`
  config.viewData = userConfig.viewData || config.viewData;
  config.routes = userConfig.routes || config.routes;
}

export default config;

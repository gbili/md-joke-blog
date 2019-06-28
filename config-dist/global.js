"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _BlogPostRoute = _interopRequireDefault(require("../dist/route/BlogPostRoute"));

var _BlogHomeRoute = _interopRequireDefault(require("../dist/route/BlogHomeRoute"));

var _StaticFileRoute = _interopRequireDefault(require("../dist/route/StaticFileRoute"));

var _NotFoundRoute = _interopRequireDefault(require("../dist/route/NotFoundRoute"));

let userConfig = {};

try {
  const userCustomConfigPath = `${__dirname}/../../../md-toy-blog.config.js`;
  userConfig = require(userCustomConfigPath).default;
} catch (err) {
  console.log('You can customize the config by creating a md-joke-blog.config.js in your repo');
  console.log('Will be using default config...');
}

const config = {}; // load the hello world fake content

config.mdBlogPostsDir = `${__dirname}/../content`;
config.staticFilesDir = `${__dirname}/../static`;
config.viewData = {
  siteTitle: 'Markdown Joke Blog'
};
config.bodyPreviewLength = 70;

config.missingRefValueReplacement = ref => {
  console.log(`Warning - Missing ref: ${ref}`);
  return `${ref}`;
};

config.compiledUserContentDir = userConfig.compiledUserContentDir || `${__dirname}/../compiled_user_content`;
config.viewsDir = userConfig.viewsDir || `${__dirname}/../dist/view`;

const validPostSlugListGetter = function () {
  const compiledUserContentDir = config.compiledUserContentDir;
  return function () {
    const postList = require(`${compiledUserContentDir}/post-list`);

    return postList.map(fileName => fileName.split('.').shift());
  };
}();

const relativeStaticFileListGetter = function () {
  const staticFilesDir = config.staticFilesDir;
  return function () {
    const staticFileList = require(`${config.compiledUserContentDir}/static-file-list`);

    return staticFileList.map(fullPath => fullPath.split((0, _path.resolve)(staticFilesDir)).pop());
  };
}();

config.routes = [{
  path: '/',
  route: _BlogPostRoute.default,
  params: {
    validPostSlugListGetter
  }
}, {
  path: '/',
  route: _BlogHomeRoute.default,
  params: {
    // a list of post filenames without the full path
    validPostSlugListGetter
  }
}, {
  path: '/css/',
  route: _StaticFileRoute.default,
  params: {
    // a list of absolute path static files names
    staticFilePathsGetter: relativeStaticFileListGetter
  }
}, {
  path: '*',
  route: _NotFoundRoute.default,
  params: {}
}];

if (process.env.MTB_ENV === 'production') {
  config.mdBlogPostsDir = userConfig.mdBlogPostsDir || `${__dirname}/../../../content`;
  config.staticFilesDir = userConfig.staticFilesDir || config.staticFilesDir;
  config.viewData = userConfig.viewData || config.viewData;
  config.routes = userConfig.routes || config.routes;
  config.bodyPreviewLength = userconfig.bodyPreviewLength || config.bodyPreviewLength;
  config.missingRefValueReplacement = userconfig.missingRefValueReplacement || config.missingRefValueReplacement;
}

var _default = config;
exports.default = _default;
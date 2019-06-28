# md-toy-blog: Simplest Whitelist Blog

> **Disclaimer**: you can install this, but if you are into blogging, don't. This is a project just intended to as a learning adventure.

A package that will let serve your Markdown files as blog posts. These posts have to live in their own git repository (let's call it `my-posts` for illustration purposes). Posts need to be stored inside `my-posts/content`. For example `my-posts/content/hello-world-post.md`. Then it pretty straight forward:

1. Install `md-toy-blog`
   ```
   cd my-posts
   npm init
   npm i -P md-toy-blog
   ```
2. Generate post list
   ```
   MTB_ENV=production node node_modules/md-toy-blog/dist/config/generate.js
   ```
3. Require `md-toy-blog` in your entry point, say `my-posts/index.js`, add:
   ```javascript
   var mtb = require('md-toy-blog');
   ```
4. Serve your blog
   ```
   MTB_ENV=production node index.js
   ```

## Allowed refinements:
You can create a file named `md-toy-blog.config.js`, and export customizations, such as:
- Change the blog title
  ```
  module.exports.default = {
    siteTitle: 'My Ridiculous Blog'
  };
  ```
- Using your own views
- Using your own static files (css etc.)
- Creating your own routes
- Chainging the home posts excerpt length
- Or what to replace template references missing in data

Have a look at `node_modules/md-toy-blog/config/global.js` to see which ones you can alter. Here is how config is constructed, and `userConfig` contains the exports of `md-toy-blog.config.js`.
```javascript
config.mdBlogPostsDir = userConfig.mdBlogPostsDir || `${__dirname}/../../../content`
config.staticFilesDir = userConfig.staticFilesDir || config.staticFilesDir;
config.viewData = userConfig.viewData || config.viewData;
config.routes = userConfig.routes || config.routes;
config.bodyPreviewLength = userConfig.bodyPreviewLength || config.bodyPreviewLength;
config.missingRefValueReplacement = userConfig.missingRefValueReplacement || config.missingRefValueReplacement;
```

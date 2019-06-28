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


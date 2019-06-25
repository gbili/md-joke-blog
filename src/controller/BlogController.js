import fs from 'fs';
import marked from 'marked';
import fm from 'front-matter';
import Prism from 'prismjs';
import HtmlTemplateController from './HtmlTemplateController';

class BlogController extends HtmlTemplateController {
  constructor(config) {
    super(config);
  }

  loadMarkdown(postSlug) {
    const mdBlogPostsDir = (typeof this.config.mdBlogPostsDir !== 'undefined')
      ? this.config.mdBlogPostsDir
      : `${__dirname}/../../content`;
    const filepath = `${mdBlogPostsDir}/${postSlug}.md`
    return new Promise(function(resolve, reject) {
      fs.readFile(filepath, 'utf-8', function(err, fileContents) {
        if (err) return reject(err);
        const data = fm(fileContents);
        if (typeof data.attributes === 'undefined') data.attributes = {};
        data.attributes.slug = postSlug;
        data.body = marked(data.body, {
          highlight: function(code, lang) {
            return Prism.highlight(code, Prism.languages[lang], lang);
          },
        });
        return resolve(data);
      });
    })
  };

  homeAction({ posts }) {
    const postsDataPormises = posts.map((function (postSlug) {
      return this.loadMarkdown(postSlug);
    }).bind(this));
    return Promise.all(postsDataPormises).then((function (postsData) {
      const bodyPreviewLength = this.config.bodyPreviewLength || 70;
      const posts = postsData.map(postData => {
        postData.body = postData.body.substring(0, bodyPreviewLength);
        return postData;
      });
      const data = {
        title: 'Home',
        posts,
      };
      return this.loadViewTemplate(data);
    }).bind(this))
      .then(this.hydrateView)
      .catch(this.handleError);
  }

  postAction({ postSlug }) {
    return this.loadMarkdown(postSlug)
      .then(this.loadViewTemplate)
      .then(this.hydrateView)
      .catch(this.handleError);
  }
}

export default BlogController;

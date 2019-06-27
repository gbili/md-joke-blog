import fs from 'fs';
import marked from 'marked';
import fm from 'front-matter';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index';
import HtmlTemplateController from './HtmlTemplateController';

class BlogController extends HtmlTemplateController {
  constructor(config) {
    super(config);
  }

  loadMarkdown(postSlug, isHome) {
    const fixNoLanguageBugFallbackToJS = function (body) {
      return body.replace(/```\n([^`]+)```([^\w])/sg, "```javascript\n$1```$2");
    };
    const filepath = `${this.config.mdBlogPostsDir}/${postSlug}.md`;
    return new Promise(function(resolve, reject) {
      fs.readFile(filepath, 'utf-8', function(err, fileContents) {
        if (err) return reject(err);
        const data = fm(fileContents);
        if (typeof data.attributes === 'undefined') data.attributes = {};
        data.attributes.slug = postSlug;
        data.body = fixNoLanguageBugFallbackToJS(data.body);
        if (isHome) {
          data.body = typeof data.attributes.description !== 'undefined'
            ? data.attributes.description
            : data.body.replace(/(```[^`]+```)([^\w])/sg, "$2");
        }
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
      return this.loadMarkdown(postSlug, true);
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

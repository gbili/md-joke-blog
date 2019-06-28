import fs from 'fs';
import fm from 'front-matter';
import showdown from 'showdown';
import showdownHighlight from 'showdown-highlight';
import HtmlTemplateController from './HtmlTemplateController';

// loadLanguages();

class BlogController extends HtmlTemplateController {
  constructor(config) {
    super(config);
  }

  loadMarkdown(postSlug, isHome) {
    const filepath = `${this.config.mdBlogPostsDir}/${postSlug}.md`;
    return new Promise(function(resolve, reject) {
      fs.readFile(filepath, 'utf-8', function(err, fileContents) {

        if (err) return reject(err);

        const data = fm(fileContents);
        if (typeof data.attributes === 'undefined') data.attributes = {};
        data.attributes.slug = postSlug;

        const fixNoLanguageBugFallbackToJS = function (body) {
          return body.replace(/```\n([\s\S]*?\n)```/sg, "```plaintext\n$1```");
        };
        data.body = fixNoLanguageBugFallbackToJS(data.body);

        if (isHome) {
          const useDescriptionAttrOrStripOutCodeBlocksAndUseFirstLine = function(data) {
            let ret = typeof data.attributes.description !== 'undefined'
              ? data.attributes.description
              : data.body.replace(/(```[a-z]*\n[\s\S]*?\n```)/sg, "");
            ret = ret.match(/([^\n]+)\n/g);
            return ret[0] || "You'll need to click to know more";
          };
          data.body = useDescriptionAttrOrStripOutCodeBlocksAndUseFirstLine(data);
        }

        const converter = new showdown.Converter({
          extensions: [showdownHighlight]
        });
        data.body = converter.makeHtml(data.body);
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

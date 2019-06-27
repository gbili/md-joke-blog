"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _marked = _interopRequireDefault(require("marked"));

var _frontMatter = _interopRequireDefault(require("front-matter"));

var _prismjs = _interopRequireDefault(require("prismjs"));

var _index = _interopRequireDefault(require("prismjs/components/index"));

var _HtmlTemplateController = _interopRequireDefault(require("./HtmlTemplateController"));

class BlogController extends _HtmlTemplateController.default {
  constructor(config) {
    super(config);
  }

  loadMarkdown(postSlug, isHome) {
    const fixNoLanguageBugFallbackToJS = function (body) {
      return body.replace(/```\n([^`]+)```([^\w])/sg, "```javascript\n$1```$2");
    };

    const filepath = `${this.config.mdBlogPostsDir}/${postSlug}.md`;
    return new Promise(function (resolve, reject) {
      _fs.default.readFile(filepath, 'utf-8', function (err, fileContents) {
        if (err) return reject(err);
        const data = (0, _frontMatter.default)(fileContents);
        if (typeof data.attributes === 'undefined') data.attributes = {};
        data.attributes.slug = postSlug;
        data.body = fixNoLanguageBugFallbackToJS(data.body);

        if (isHome) {
          data.body = typeof data.attributes.description !== 'undefined' ? data.attributes.description : data.body.replace(/(```[^`]+```)([^\w])/sg, "$2");
        }

        data.body = (0, _marked.default)(data.body, {
          highlight: function (code, lang) {
            return _prismjs.default.highlight(code, _prismjs.default.languages[lang], lang);
          }
        });
        return resolve(data);
      });
    });
  }

  homeAction({
    posts
  }) {
    const postsDataPormises = posts.map(function (postSlug) {
      return this.loadMarkdown(postSlug, true);
    }.bind(this));
    return Promise.all(postsDataPormises).then(function (postsData) {
      const bodyPreviewLength = this.config.bodyPreviewLength || 70;
      const posts = postsData.map(postData => {
        postData.body = postData.body.substring(0, bodyPreviewLength);
        return postData;
      });
      const data = {
        title: 'Home',
        posts
      };
      return this.loadViewTemplate(data);
    }.bind(this)).then(this.hydrateView).catch(this.handleError);
  }

  postAction({
    postSlug
  }) {
    return this.loadMarkdown(postSlug).then(this.loadViewTemplate).then(this.hydrateView).catch(this.handleError);
  }

}

var _default = BlogController;
exports.default = _default;
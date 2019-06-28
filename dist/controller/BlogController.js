"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _frontMatter = _interopRequireDefault(require("front-matter"));

var _showdown = _interopRequireDefault(require("showdown"));

var _showdownHighlight = _interopRequireDefault(require("showdown-highlight"));

var _HtmlTemplateController = _interopRequireDefault(require("./HtmlTemplateController"));

// loadLanguages();
class BlogController extends _HtmlTemplateController.default {
  constructor(config) {
    super(config);
  }

  loadMarkdown(postSlug, preHtmlCallback) {
    const filepath = `${this.config.mdBlogPostsDir}/${postSlug}.md`;
    return new Promise(function (resolve, reject) {
      _fs.default.readFile(filepath, 'utf-8', function (err, fileContents) {
        if (err) return reject(err);
        let data = (0, _frontMatter.default)(fileContents);
        if (typeof data.attributes === 'undefined') data.attributes = {};
        data.attributes.slug = postSlug;

        const fixNoLanguageBugFallbackToJS = function (body) {
          return body.replace(/```\n([\s\S]*?\n)```/sg, "```plaintext\n$1```");
        };

        data.body = fixNoLanguageBugFallbackToJS(data.body);
        if (preHtmlCallback) data = preHtmlCallback(data);
        const converter = new _showdown.default.Converter({
          extensions: [_showdownHighlight.default]
        });
        data.body = converter.makeHtml(data.body);
        return resolve(data);
      });
    });
  }

  getPostPreviewShortener() {
    const previewLength = this.config.bodyPreviewLength;
    return function (data) {
      let preview = typeof data.attributes.description !== 'undefined' ? data.attributes.description : data.body.replace(/(```[a-z]*\n[\s\S]*?\n```)/sg, "");
      preview = preview.match(/([^\n]+)\n/g);
      preview = preview[0] || "You'll need to click to know more";
      data.body = preview.substring(0, previewLength);
      return data;
    };
  }

  homeAction({
    posts
  }) {
    const postsDataPormises = posts.map(function (postSlug) {
      return this.loadMarkdown(postSlug, this.getPostPreviewShortener());
    }.bind(this));
    return Promise.all(postsDataPormises).then(function (postsData) {
      const data = {
        title: 'Home',
        posts: postsData
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
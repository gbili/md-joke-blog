import fs from 'fs';
import marked from 'marked';
import Prism from 'prismjs';
import HtmlTemplateController from './HtmlTemplateController';
import config from '../config/global'

class BlogController extends HtmlTemplateController {
  constructor() {
    super();
  }

  loadMarkdown(postSlug) {
    const mdBlogPostsDir = (typeof config.mdBlogPostsDir !== 'undefined')
      ? config.mdBlogPostsDir
      : `${__dirname}/../../content`;
    const filepath = `${mdBlogPostsDir}/${postSlug}.md`
    return new Promise(function(resolve, reject) {
      fs.readFile(filepath, 'utf-8', function(err, fileContents) {
        (err && reject(err)) || resolve({
          title: postSlug,
          content: marked(fileContents, {
            highlight: function(code, lang) {
              return Prism.highlight(code, Prism.languages[lang], lang);
            },
          }),
        });
      });
    })
  };

  homeAction({ content }) {
     return this.loadViewTemplate({title:'Home', content})
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

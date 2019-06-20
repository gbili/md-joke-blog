import fs from 'fs';
import marked from 'marked';
import Prism from 'prismjs';
import HtmlTemplateController from './HtmlTemplateController';

class BlogController extends HtmlTemplateController {
  constructor() {
    super();
  }

  loadMarkdown(postName) {
    const filepath = `${__dirname}/../../content/${postName}.md`;
    return new Promise(function(resolve, reject) {
      fs.readFile(filepath, 'utf-8', function(err, fileContents) {
        (err && reject(err)) || resolve({
          title: postName,
          content: marked(fileContents, {
            highlight: function(code, lang) {
              return Prism.highlight(code, Prism.languages[lang], lang);
            },
          }),
        });
      });
    })
  };

  homeAction({content}) {
     return this.loadViewTemplate({title:'Home', content})
       .then(this.hydrateView)
       .catch(this.handleError);
  }

  postAction({ postName }) {
    return this.loadMarkdown(postName)
      .then(this.loadViewTemplate)
      .then(this.hydrateView)
      .catch(this.handleError);
  }
}

export default BlogController;

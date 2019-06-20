import fs from 'fs';
import marked from 'marked';
import Prism from 'prismjs';
import BaseController from './BaseController';

class BlogController extends BaseController{
  postAction(params) {
    const { postName } = params;
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
    });
  }
}

export default BlogController;

import fs from 'fs';

class BlogController {
  constructor() {
    this.loadView = this.loadView.bind(this);
    this.hydrateView = this.hydrateView.bind(this);
    this.handleError = this.handleError.bind(this);
    this.response = {};
  }

  dispatch({action, params}) {
    this.action = action;
    return this[`${action}Action`](params)
      .then(this.loadView)
      .then(this.hydrateView)
      .catch(this.handleError);
  }

  loadView(viewData) {
    const filepath = `${__dirname}/../view/${this.action}.html`;
    return new Promise(function(resolve, reject) {
      fs.readFile(filepath, 'utf-8', function(err, viewTemplate) {
        if (err) return reject(err);
        resolve({viewTemplate, viewData});
      });
    });
  }

  hydrateView({viewTemplate, viewData}) {
    for (let param in viewData) {
      viewTemplate = viewTemplate.replace(
        new RegExp(`{{ ${param} }}`, 'g'),
        viewData[param]
      );
    }
    this.response.code = 200;
    this.response.headers = {'content-type': 'text/html; charset=utf-8'};
    this.response.body = viewTemplate;
    return this.response;
  }

  handleError(err) {
    this.response.code = 501;
    this.response.headers = {'content-type': 'text/plain; charset=utf-8'};
    this.response.body = 'Internal server error, could not retrieve blog post';
    console.log(err);
  }

  postAction(params) {
    const { postName } = params;
    const filepath = `${__dirname}/../../content/${postName}.md`;
    return new Promise(function(resolve, reject) {
      fs.readFile(filepath, 'utf-8', function(err, fileContents) {
        (err && reject(err)) || resolve({
          title: postName,
          content: fileContents
        });
      });
    });
  }
}

export default BlogController;

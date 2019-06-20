import fs from 'fs';
import _p from 'primap';

class BaseController {
  constructor() {
    _p.bind(this);
    this.response = {};

    _p().loadView = (function(viewData) {
      const filepath = `${__dirname}/../view/${this.action}.html`;
      return new Promise(function(resolve, reject) {
        fs.readFile(filepath, 'utf-8', function(err, viewTemplate) {
          if (err) return reject(err);
          resolve({viewTemplate, viewData});
        });
      });
    }).bind(this);

    _p().hydrateView = (function({viewTemplate, viewData}) {
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
    }).bind(this);

    _p().handleError = (function(err) {
      this.response.code = 501;
      this.response.headers = {'content-type': 'text/plain; charset=utf-8'};
      this.response.body = 'Internal server error, could not retrieve blog post';
      console.log(err);
    }).bind(this);
  }

  dispatch({action, params}) {
    this.action = action;
    return this[`${action}Action`](params)
      .then(_p().loadView)
      .then(_p().hydrateView)
      .catch(_p().handleError);
  }
}

export default BaseController;

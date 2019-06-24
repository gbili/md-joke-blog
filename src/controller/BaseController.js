class BaseController {
  constructor(config) {
    this.config = config || {};
    this.response = {};
    this.action = null;
    this.handleError = this.handleError.bind(this);
  }

  handleError(err) {
    this.response.code = 501;
    this.response.headers = {'content-type': 'text/plain; charset=utf-8'};
    this.response.body = 'Internal server error, could not retrieve blog post';
    console.log(err);
  };

  dispatch({action, params}) {
    this.action = action;
    return this[`${action}Action`](params);
  }
}

export default BaseController;

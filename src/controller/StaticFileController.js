import fs from 'fs';
import mime from 'mime-types';
import BaseController from './BaseController';

class StaticFileController extends BaseController {
  constructor() {
    super();
  }

  indexAction({ filepath }) {
    const staticFilesDir = (typeof config.staticFilesDir !== 'undefined')
      ? config.staticFilesDir
      : `${__dirname}/../../static`;
    filepath = `${staticFilesDir}/${filepath}`;
    return (new Promise(function(resolve, reject) {
        fs.readFile(filepath, 'utf-8', function(err, rawContents) {
          if (err) return reject(err);
          return resolve(rawContents);
        });
      }))
      .then((function(rawContents) {
        const mimeType = mime.lookup(filepath);
        this.response.code = 200;
        this.response.headers = {
          'content-type': `${mime.contentType(mimeType)}; charset=${mime.charset(mimeType)}`
        };
        this.response.body = rawContents;
        return this.response;
      }).bind(this))
      .catch(this.handleError);
  }
}

export default StaticFileController;

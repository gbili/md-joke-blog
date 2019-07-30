import fs from 'fs';
import recursive from 'recursive-readdir'

class DirFilesToJson {
  constructor({ sourceDir, destFile }) {
    this.sourceDir = sourceDir;
    this.destFile = destFile;
    this.readFilesListPromise = this.readFilesListPromise.bind(this);
    this.writeJsonFilePromise = this.writeJsonFilePromise.bind(this);
  }

  readFilesListPromise(recrusiveRead) {
    const readingFunction = recrusiveRead ? recursive : fs.readdir;
    return (
      new Promise((function (resolve, reject) {
        readingFunction(this.sourceDir, (err, files) => {
          if (err) reject(err);
          resolve(files);
        });
      }).bind(this))
    );
  }

  writeJsonFilePromise(files) {
    const filesListAsJsonString = JSON.stringify(files);
    const fileContents = (this.destFile.split('.').pop() === 'json')
      ? filesListAsJsonString
      : `export default ${filesListAsJsonString};`

    return (
      new Promise((function (resolve, reject) {
        fs.writeFile(this.destFile, fileContents, (function(err) {
          if (err) reject(err);
          resolve(this.destFile);
        }).bind(this));
      }).bind(this))
    );
  }

  generate(onSuccess, onFail, recrusiveRead) {
    recrusiveRead = typeof recrusiveRead === 'boolean' ? recrusiveRead : true;
    if (typeof onSuccess === 'undefined') onSuccess = function(writtenFilePath) {};
    if (typeof onFail === 'undefined') onFail = function(err) {};

    this.readFilesListPromise(recrusiveRead)
      .then(this.writeJsonFilePromise)
      .then(onSuccess)
      .catch(onFail);
  }
}

export default DirFilesToJson;

import DirFilesToJson from './DirFilesToJson';

const dfj = new DirFilesToJson({
  sourceDir: `${__dirname}/../content/`,
  destFile: `${__dirname}/post-list.json`
});

dfj.generate(function(file) {console.log('we made it!, file written ', file)}, function(err) {console.log(err)});

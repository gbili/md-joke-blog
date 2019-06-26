import DirFilesToJson from './DirFilesToJson';
import config from '../../config-dist/global';

const recursive = true;

const blogPostsJson = new DirFilesToJson({
  sourceDir: config.mdBlogPostsDir,
  destFile: `${config.compiledUserContentDir}/post-list.json`,
});

blogPostsJson.generate(
  function(file) {console.log('Blog post list written ', file)},
  function(err) {console.log(err)},
  !recursive
);

const staticFilesJson = new DirFilesToJson({
  sourceDir: config.staticFilesDir,
  destFile: `${config.compiledUserContentDir}/static-file-list.json`,
});

staticFilesJson.generate(
  function(file) {console.log('Static file list written ', file)},
  function(err) {console.log(err)},
  recursive
);

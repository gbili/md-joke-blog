import http from 'http';
import { URL } from 'url';
import BlogRoute from './route/BlogRoute';

const port = process.env.port || 1337;

const app = http.createServer(function (req, res) {
  const blogRoute = new BlogRoute({
    path: '/',
    validPostNames: [],
  });
  if (blogRoute.matches(req) && blogRoute.isValid(req)) {
    console.log('I can handle the request');
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end('I will soon send you the blog contents');
    return;
  }
  res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
  res.end('404 Not Found.');
});

app.listen(port);

console.log(`Listening on : http://localhost:${port}`);

import http from 'http';
import BlogRoute from './route/BlogRoute';
import BlogController from './controller/BlogController';

const port = process.env.port || 1337;

const app = http.createServer(async function (req, res) {

  const route = new BlogRoute({
    path: '/',
    validPostNames: ['my-blog-post'],
  });

  if (route.matches(req) && route.isValid(req)) {
    const controller = new BlogController();

    const response = await controller.dispatch({
      action: 'post',
      params: {
        postName: route.getRequestedPostName(req),
      }
    });

    res.writeHead(response.code, response.headers);
    res.end(response.body);
    return;
  }

  res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
  res.end('404 Not Found.');

});

app.listen(port);

console.log(`Listening on : http://localhost:${port}`);

import http from 'http';
import BlogRoute from './route/BlogRoute';
import BlogController from './controller/BlogController';
import Router from './route/Router.js';
import routerConfig from '../config/router-config';

const port = process.env.port || 1337;

const app = http.createServer(async function (req, res) {

  const router = new Router();

  const response = await router.resolve(req, routerConfig.routes);

  if (response) {
    res.writeHead(response.code, response.headers);
    res.end(response.body);
    return;
  }

});

app.listen(port);

console.log(`Listening on : http://localhost:${port}`);

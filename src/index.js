import http from 'http';
import fs from 'fs';
import BlogPostRoute from './route/BlogPostRoute';
import BlogController from './controller/BlogController';
import Router from './route/Router.js';
import config from '../config-dist/global';

const port = process.env.port || 1337;

const app = http.createServer(async function (req, res) {

  const response = await (new Router(config)).resolve(req);

  if (response) {
    res.writeHead(response.code, response.headers);
    res.end(response.body);
    return;
  }

});

app.listen(port);

console.log(`Listening on : http://localhost:${port}`);

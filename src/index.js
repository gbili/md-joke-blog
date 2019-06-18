import http from 'http';

const port = process.env.port || 1337;

const app = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
  res.end('A simple micro blog website with no frills nor nonsense');
});

app.listen(port);

console.log(`Listening on : http://localhost:${port}`);

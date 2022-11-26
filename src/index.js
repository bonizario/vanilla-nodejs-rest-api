const http = require('node:http');
const { URL } = require('node:url');

const routes = require('./routes');

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://localhost:3333${request.url}`);
  const route = routes.find(routeObj => (
    routeObj.endpoint === parsedUrl.pathname && routeObj.method === request.method
  ));
  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams);
    route.handler(request, response);
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
  }
});

server.listen(3333, () => {
  console.log('Server is running at http://localhost:3333');
});

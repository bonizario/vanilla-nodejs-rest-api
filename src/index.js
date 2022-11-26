const http = require('node:http');

const routes = require('./routes');

const server = http.createServer((request, response) => {
  const route = routes.find(routeObj => (
    routeObj.endpoint === request.url && routeObj.method === request.method
  ));
  if (route) {
    route.handler(request, response);
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end(`Cannot ${request.method} ${request.url}`);
  }
});

server.listen(3333, () => {
  console.log('Server is running at http://localhost:3333');
});

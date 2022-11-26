const http = require('node:http');
const { URL } = require('node:url');

const bodyParser = require('./helpers/bodyParser');
const routes = require('./routes');

const PORT = 3333;
const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://localhost:${PORT}${request.url}`);

  let id = null, { pathname } = parsedUrl;
  const splitEndpoint = pathname.split('/').filter(Boolean);
  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }

  const route = routes.find(routeObj => (
    routeObj.endpoint === pathname && routeObj.method === request.method
  ));

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams);
    request.params = { id };
    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(body));
    };
    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      bodyParser(request, () => route.handler(request, response));
    } else {
      route.handler(request, response);
    }
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    return response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
  }
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

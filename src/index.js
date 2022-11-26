// Import Node.js built-in modules
const http = require('node:http');
const { URL } = require('node:url');

// Import all the available routes
const routes = require('./routes');

// Specify the port the server will run on
const PORT = 3333;
// Create an HTTP server
const server = http.createServer((request, response) => {
  // Parse the URL to separate params from the pathname
  const parsedUrl = new URL(`http://localhost:${PORT}${request.url}`);
  let id = null, { pathname } = parsedUrl;
  // Split endpoint to retrieve the :id route param and filter the first element ('')
  const splitEndpoint = pathname.split('/').filter(Boolean);
  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }
  // Find the route the request was made on
  const route = routes.find(routeObj => (
    routeObj.endpoint === pathname && routeObj.method === request.method
  ));
  // If the specified endpoint exists
  if (route) {
    // Inject query params into the request
    // (searchParams is an iterable and fromEntries() converts it into an Object)
    request.query = Object.fromEntries(parsedUrl.searchParams);
    // Inject route params into the request
    request.params = { id };
    // Inject send method into the reponse
    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(body));
    };
    // Return the handler response
    route.handler(request, response);
  } else {
    // Write the statusCode and Content-Type header in the response
    response.writeHead(404, { 'Content-Type': 'text/html' });
    // End the response with an error message
    return response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
  }
});

// Start a server listening for connections
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

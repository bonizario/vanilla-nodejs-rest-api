## Vanilla Node.js RESTful API

This project is just a simple RESTful API built without additional npm packages.

The idea is to grasp how express and other microframeworks work behind the scenes, using only built-in modules.

### Project structure

```
|-src
  |-controllers
    | UserController.js
  |-mocks
    | users.js
  | index.js
  | routes.js
```

#### 👋🏻 Get in touch!

I'd be happy to share some thoughts about Node.js and other dev-related stuff!

Linkedin: https://linkedin.com/in/gabriel-bonizario

<br />

---

<br />

### Commented Files

```js
// Import Node.js built-in modules
const http = require('node:http');
const { URL } = require('node:url');

// Import all the available routes
const routes = require('./routes');

// Create an HTTP server
const server = http.createServer((request, response) => {
  // Parse the URL to separate query params from the pathname
  const parsedUrl = new URL(`http://localhost:3333${request.url}`);

  // Find the route on which the request was made
  const route = routes.find(routeObj => (
    routeObj.endpoint === parsedUrl.pathname && routeObj.method === request.method
  ));

  if (route) {
    // Inject the query params object into the request
    // (searchParams is an iterable and fromEntries() converts it into an Object)
    request.query = Object.fromEntries(parsedUrl.searchParams);
    // Return the handler response if the specified endpoint exists
    route.handler(request, response);
  } else {
    // Write the statusCode and Content-Type header in the response
    response.writeHead(404, { 'Content-Type': 'text/html' });
    // End the response with an error message
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
  }
});

// Start a server listening for connections
server.listen(3333, () => {
  console.log('Server is running at http://localhost:3333');
});
```

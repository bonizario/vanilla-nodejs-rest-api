const users = require('../mocks/users');

module.exports = {
  index(request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(users));
  },
};

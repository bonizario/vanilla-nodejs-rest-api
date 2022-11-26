const users = require('../mocks/users');

module.exports = {
  index(request, response) {
    const { order } = request.query;
    const sortedUsers =
      order === 'desc'
        ? users.sort((a, b) => (a.name < b.name ? 1 : -1))
        : users.sort((a, b) => (a.name > b.name ? 1 : -1));
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(sortedUsers));
  },
};

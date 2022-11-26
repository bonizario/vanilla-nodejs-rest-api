const users = require('../mocks/users');

module.exports = {
  index(request, response) {
    const { order } = request.query;
    const sortedUsers =
      order === 'desc'
        ? users.sort((a, b) => (a.name < b.name ? 1 : -1))
        : users.sort((a, b) => (a.name > b.name ? 1 : -1));
    return response.send(200, sortedUsers);
  },
  show(request, response) {
    const { id } = request.params;
    const foundUser = users.find(user => user.id === Number(id));
    if (!foundUser) {
      return response.send(404, { error: 'User not found' });
    }
    return response.send(200, foundUser);
  },
  create(request, response) {
    // Receive the request body chunk by chunk (stream)
    let body = '';
    request.on('data', chunk => {
      body += chunk;
    });
    request.on('end', () => {
      body = JSON.parse(body);
      const user = {
        id: users.length + 1,
        name: body.name,
      };
      users.push(user);
      return response.send(201, user);
    })
  }
};

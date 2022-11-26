let users = require('../mocks/users');

module.exports = {
  index(request, response) {
    const { order } = request.query;
    const sortedUsers =
      order === 'desc'
        ? [...users].sort((a, b) => (a.name < b.name ? 1 : -1))
        : [...users].sort((a, b) => (a.name > b.name ? 1 : -1));
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
    const { name } = request.body;
    const user = {
      id: users[users.length - 1].id + 1,
      name,
    };
    users.push(user);
    return response.send(201, user);
  },
  edit(request, response) {
    const id = Number(request.params.id);
    const { name } = request.body;
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex < 0) {
      return response.send(404, { error: 'User not found' });
    }
    const user = {
      ...users[userIndex],
      name,
    };
    users[userIndex] = user;
    return response.send(200, user);
  },
  destroy(request, response) {
    const id = Number(request.params.id);
    users = users.filter(user => user.id !== id);
    return response.send(204);
  }
};

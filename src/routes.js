const UserController = require('./controllers/UserController');

module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    handler: UserController.index,
  },
  {
    endpoint: '/users/:id',
    method: 'GET',
    handler: UserController.show,
  },
];

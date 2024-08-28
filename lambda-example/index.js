const { sendResponse, sendError } = require('./responses/index');
const emoji = require('node-emoji');

const todos = [
  { id: 1, todo: 'Köp kaffe' },
  { id: 2, todo: 'Köp kaka' },
  { id: 3, todo: 'Brygg kaffe' },
  { id: 4, todo: 'Drick kaffe' },
];

exports.handler = async (event) => {
  console.log(event);
  const { method, path } = event.requestContext.http;

  if (method === 'GET' && path === '/todo') {
    return sendResponse(todos);
  } else if (method === 'POST' && path === '/todo') {
    const todo = JSON.parse(event.body);
    todo.emoji = emoji.random();

    todos.push(todo);

    return sendResponse(todos);
  } else {
    return sendError(404, 'URL not found');
  }
};

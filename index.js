const getBalance = require('./src/getBalance');

exports.handler = (event, context, callback) => {
  console.info('event: ', event);
  const username = event.username;

  callback(null, getBalance(username));
};

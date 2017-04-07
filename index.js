const getBalance = require('./src/getBalance');

exports.handler = (event, context, callback) => {
  console.info('event: ', event);
  const username = event.user_name;

  getBalance(username).then((balance) => {
    callback(null, getBalance(username));
  });
};

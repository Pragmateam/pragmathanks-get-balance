const getBalance = require('./src/getBalance');

exports.handler = (event, context, callback) => {
  console.info('event: ', event);
  const username = event.username;

  getBalance(username)
    .then(response => {
      console.log('response: ', response);

      return callback(null, response);
    }).catch(err => console.error(err));
};

const authorize = require('./src/google-api/authorize');
const googleCredentials = require('./src/google-api/googleCredentials');

const getBalance = require('./src/getBalance');

exports.handler = (event, context, callback) => {
  console.info('event: ', event);

  authorize(googleCredentials, (auth) => {
    const username = event.username || event.user_name

    getBalance(auth, username).then((message) => {
      callback(null, message);
    }).catch(err => console.error(err));
  });
};

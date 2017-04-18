const ApiBuilder = require('claudia-api-builder');

const api = new ApiBuilder();
const authorize = require('./src/google-api/authorize');
const googleCredentials = require('./src/google-api/googleCredentials');

const getBalance = require('./src/getBalance');

module.exports = api;

api.get('/balance', (request) => {
  const response = authorize(googleCredentials, (auth) => {
    const username = request.queryString.username || request.queryString.user_name

    return getBalance(auth, username).then((message) => {
      return message;
    }).catch(err => console.error(err));
  });


  return response;
}, { success: { contentType: 'text/plain' } });

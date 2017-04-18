const api = require('../index');
const args = process.argv.slice(2);
const usernameFromCommandLine = args[args.length - 1];

const apiRequest = {
  context: {
    path: '/balance',
    method: 'GET'
  },
  queryString: {
    username: usernameFromCommandLine
  }
};

api.proxyRouter(apiRequest, {
  done: (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(data.body);
  }
});

const args = process.argv.slice(2);
const usernameFromCommandLine = args[args.length - 1];

module.exports = {
  "username": usernameFromCommandLine
};

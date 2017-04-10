const fs = require('fs');
const readline = require('readline');
const GoogleAuth = require('google-auth-library');
const readFile = require('./readFile');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/sheets.googleapis.com-nodejs-quickstart.json
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_DIR = `${(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE)}/.credentials`;
const TOKEN_PATH = `${TOKEN_DIR}/sheets.googleapis.com-nodejs-quickstart.json`;

const storeToken = (token) => {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }

  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log(`Token stored to ${TOKEN_PATH}`);
};

const getNewToken = (oauth2Client, callback) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('Authorize this app by visiting this url: ', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oauth2Client.getToken(code, (err, token) => {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }

      storeToken(token);
      callback(Object.assign({ credentials: token }, oauth2Client));
    });
  });
};

const authorize = (credentials, callback) => {
  const clientSecret = credentials.installed.client_secret;
  const clientId = credentials.installed.client_id;
  const redirectUrl = credentials.installed.redirect_uris[0];
  const auth = new GoogleAuth();
  const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  readFile(TOKEN_PATH).then((token) => {
    oauth2Client.credentials = JSON.parse(token);
    callback(oauth2Client);
  }).catch((err) => {
    console.error(err);

    getNewToken(oauth2Client, callback);
  });
};

module.exports = authorize;

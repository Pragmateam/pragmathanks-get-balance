const google = require('googleapis');
const SPREADSHEET_ID = '';

const getBalance = (username) => {
  const auth = {};
  const sheets = google.sheets('v4');

  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: SPREADSHEET_ID,
      range: 'Balance',
    }, (err, response) => {
      if (err) return reject(err);

      if (response.values) {
        const usernameList = response.values[2];
        const balanceList = response.values[4];

        const usernameIndex = usernameList.indexOf(username);

        if (usernameIndex < 0) return resolve('It seems you are not on our records.');

        const balance = balanceList[usernameList.indexOf(username)];

        return resolve(`Your balance is ${balance} and you have 0 to give`);
      }

      return resolve('Your balance is 0 and you have 0 to give');
    });
  });
};

module.exports = getBalance;

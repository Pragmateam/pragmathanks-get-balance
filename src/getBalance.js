const google = require('googleapis');
const PragmaThanksSpreadsheet = require('./PragmaThanksSpreadsheet');

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

      const spreadsheet = new PragmaThanksSpreadsheet(response.values);

      if (spreadsheet.isEmpty()) return resolve('The spreadsheet is empty');

      const usernameList = response.values[2];
      const usernameIndex = usernameList.indexOf(username);

      if (usernameIndex < 0) {
        return resolve('It seems you are not on our records.');
      }

      const balanceList = response.values[4];
      const pointsToGiveList = response.values[5];

      const balance = balanceList[usernameList.indexOf(username)];
      const pointsToGive = pointsToGiveList[usernameList.indexOf(username)];

      return resolve(`Your balance is ${balance} and you have ${pointsToGive} to give`);
    });
  });
};

module.exports = getBalance;

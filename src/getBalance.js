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

      const balance = spreadsheet.getBalance(username);
      const pointsToGive = spreadsheet.getPointsToGive(username);

      return resolve(`Your balance is ${balance} and you have ${pointsToGive} to give`);
    });
  });
};

module.exports = getBalance;

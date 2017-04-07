const google = require('googleapis');
const SPREADSHEET_ID = '';

const getBalance = () => {
  const auth = {};
  const sheets = google.sheets('v4');

  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: SPREADSHEET_ID,
      range: 'Balance',
    }, (err, response) => {
      if (err) return reject(err);

      return resolve('Your balance is 0 and you have 0 to give');
    });
  });
};

module.exports = getBalance;

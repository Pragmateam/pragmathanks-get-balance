module.exports = class PragmaThanksSpreadsheet {
  constructor(spreadsheet) {
    this.spreadsheet = spreadsheet;
  }

  isEmpty() {
    return (this.spreadsheet && this.spreadsheet.length > 0) ? false : true;
  }
};

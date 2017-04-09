module.exports = class PragmaThanksSpreadsheet {
  constructor(spreadsheet) {
    this.spreadsheet = spreadsheet;
  }

  isEmpty() {
    return !((this.spreadsheet && this.spreadsheet.length > 0));
  }

  get usernameList() { return this.spreadsheet[2]; }
  get balanceList() { return this.spreadsheet[4]; }

  getBalance(username) {
    const usernameIndex = this.usernameList.indexOf(username);

    return (usernameIndex < 0) ? 0 : this.balanceList[usernameIndex];
  }
};

const USERNAME_LIST_INDEX = 2;
const BALANCE_LIST_INDEX = 4;
const POINTS_TO_GIVE_LIST_INDEX = 5;

module.exports = class PragmaThanksSpreadsheet {
  constructor(spreadsheet) {
    this.spreadsheet = spreadsheet;
  }

  isEmpty() {
    return !((this.spreadsheet && this.spreadsheet.length > 0));
  }

  get usernameList() { return this.spreadsheet[USERNAME_LIST_INDEX]; }
  get balanceList() { return this.spreadsheet[BALANCE_LIST_INDEX]; }
  get pointsToGiveList() { return this.spreadsheet[POINTS_TO_GIVE_LIST_INDEX]; }

  getBalance(username) {
    const usernameIndex = this.usernameList.indexOf(username);

    return (usernameIndex < 0) ? 0 : this.balanceList[usernameIndex];
  }

  getPointsToGive(username) {
    const usernameIndex = this.usernameList.indexOf(username);

    return (usernameIndex < 0) ? 0 : this.pointsToGiveList[usernameIndex];
  }
};

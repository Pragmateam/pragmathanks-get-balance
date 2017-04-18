const USERNAME_LIST_INDEX = 2;
const POINTS_TO_USE_LIST_INDEX = 4;
const POINTS_TO_GIVE_LIST_INDEX = 5;

class PragmaThanksSpreadsheetFinder {
  constructor(spreadsheet) {
    this.spreadsheet = spreadsheet;
  }

  findUserPoints(username, pointsColumn) {
    const usernameList = this.spreadsheet[USERNAME_LIST_INDEX];
    const index = usernameList.indexOf(username);

    return (index < 0) ? 0 : pointsColumn[index];
  }
}

module.exports = class PragmaThanksSpreadsheet {
  constructor(spreadsheet) {
    this.spreadsheet = spreadsheet;
    this.finder = new PragmaThanksSpreadsheetFinder(spreadsheet);
  }

  isEmpty() {
    return !((this.spreadsheet && this.spreadsheet.length > 0));
  }

  getPointsToUse(username) {
    const pointsToUseList = this.spreadsheet[POINTS_TO_USE_LIST_INDEX];

    return this.finder.findUserPoints(username, pointsToUseList);
  }

  getPointsToGive(username) {
    const pointsToGiveList = this.spreadsheet[POINTS_TO_GIVE_LIST_INDEX];

    return this.finder.findUserPoints(username, pointsToGiveList);
  }
};

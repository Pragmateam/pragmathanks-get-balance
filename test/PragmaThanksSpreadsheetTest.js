const expect = require('chai').expect;

const PragmaThanksSpreadsheet = require('../src/PragmaThanksSpreadsheet');

describe('PragmaThanksSpreadsheet', () => {
  describe('#isEmpty', () => {
    it('returns true when spreadsheet is empty', () => {
      const spreadsheetContent = [];
      const sheet = new PragmaThanksSpreadsheet(spreadsheetContent);

      expect(sheet.isEmpty()).to.eql(true);
    });

    it('returns true when spreadsheet is undefined', () => {
      const sheet = new PragmaThanksSpreadsheet(undefined);

      expect(sheet.isEmpty()).to.eql(true);
    });

    it('returns false when spreadsheet is not empty', () => {
      const spreadsheetContent = [[1], [2]];
      const sheet = new PragmaThanksSpreadsheet(spreadsheetContent);

      expect(sheet.isEmpty()).to.eql(false);
    });
  });
});

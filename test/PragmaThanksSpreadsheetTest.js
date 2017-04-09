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

  describe('#getBalance', () => {
    it('returns user balance when it has at least one pragma points', () => {
      const spreadsheetContent = [
        [],
        [],
        ['foo', 'bar'],
        [],
        [1, 0],
        [0, 0],
      ];

      const sheet = new PragmaThanksSpreadsheet(spreadsheetContent);

      expect(sheet.getBalance('foo')).to.eql(1);
    });

    it('returns the balance for different users', () => {
      const spreadsheetContent = [
        [],
        [],
        ['foo', 'bar', 'biz'],
        [],
        [20, 42, 32],
        [0, 0],
      ];

      const sheet = new PragmaThanksSpreadsheet(spreadsheetContent);

      expect(sheet.getBalance('bar')).to.eql(42);
    });

    it('returns zero balance when user is not found', () => {
      const spreadsheetContent = [
        [],
        [],
        ['foo', 'bar', 'biz'],
        [],
        [20, 42, 32],
        [0, 0],
      ];

      const sheet = new PragmaThanksSpreadsheet(spreadsheetContent);

      expect(sheet.getBalance('unknown')).to.eql(0);
    });
  });
});

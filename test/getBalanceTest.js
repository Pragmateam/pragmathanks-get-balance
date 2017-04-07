const expect = require('chai').expect;
const sinon = require('sinon');
const google = require('googleapis');

const getBalance = require('../src/getBalance');

describe('getBalance', () => {
  sinon.stub(google, 'sheets').withArgs('v4');

  let spreadsheetContent = [];
  const sheets = {
    spreadsheets: {
      values: {
        get: (credentials, callback) => {
          callback(null, spreadsheetContent);
        },
      },
    },
  };

  beforeEach(() => google.sheets.returns(sheets));

  it('returns empty balance message when content is empty', (done) => {
    getBalance('foo').then((balance) => {
      expect(balance).to.eql('Your balance is 0 and you have 0 to give');

      done();
    }).catch(err => done(err));
  });

  it('returns the balance when user has got at least one PragmaThanks', (done) => {
    spreadsheetContent = {
      values: [
        [],
        [],
        ['foo', 'bar'],
        [],
        [1, 0],
        [0, 0],
      ],
    };

    getBalance('foo').then((balance) => {
      expect(balance).to.eql('Your balance is 1 and you have 0 to give');

      done();
    }).catch(err => done(err));
  });

  it('returns the balance for different users', (done) => {
    spreadsheetContent = {
      values: [
        [],
        [],
        ['foo', 'bar', 'biz'],
        [],
        [20, 42, 32],
        [0, 0],
      ],
    };

    getBalance('bar').then((balance) => {
      expect(balance).to.eql('Your balance is 42 and you have 0 to give');

      done();
    }).catch(err => done(err));
  });

  it('indicates that the user is not present on the spreadsheet when it can not be found', (done) => {
    spreadsheetContent = {
      values: [
        [],
        [],
        ['foo', 'bar'],
        [],
        [1, 0],
        [0, 0],
      ],
    };

    getBalance('unkown').then((balance) => {
      expect(balance).to.eql('It seems you are not on our records.');

      done();
    }).catch(err => done(err));
  });

  describe('when something goes wrong', () => {
    const sheetsWithError = {
      spreadsheets: {
        values: {
          get: (credentials, callback) => {
            callback(new Error('Something went wrong'));
          },
        },
      },
    };

    it('returns error', (done) => {
      google.sheets.returns(sheetsWithError);

      getBalance('alabeduarte').catch((err) => {
        expect(err).to.eql(new Error('Something went wrong'));

        done();
      });
    });
  });
});

const expect = require('chai').expect;
const sinon = require('sinon');
const google = require('googleapis');

const getBalance = require('../src/getBalance');

describe('getBalance', () => {
  sinon.stub(google, 'sheets').withArgs('v4');

  let spreadsheetContent = [];
  const auth = {};
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
    getBalance(auth, 'foo').then((balance) => {
      expect(balance).to.eql('The spreadsheet is empty');

      done();
    }).catch(err => done(err));
  });

  it('returns the balance when user has got at least one pragma points', (done) => {
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

    getBalance(auth, 'foo').then((balance) => {
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

    getBalance(auth, 'bar').then((balance) => {
      expect(balance).to.eql('Your balance is 42 and you have 0 to give');

      done();
    }).catch(err => done(err));
  });

  it('returns no balance and no points to give when user is not found', (done) => {
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

    getBalance(auth, 'unkown').then((balance) => {
      expect(balance).to.eql('Your balance is 0 and you have 0 to give');

      done();
    }).catch(err => done(err));
  });

  it('returns the points to give when user has got at least one pragma points to give', (done) => {
    spreadsheetContent = {
      values: [
        [],
        [],
        ['foo', 'bar'],
        [],
        [0, 3],
        [30, 44],
      ],
    };

    getBalance(auth, 'foo').then((balance) => {
      expect(balance).to.eql('Your balance is 0 and you have 30 to give');

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

      getBalance(auth, 'alabeduarte').catch((err) => {
        expect(err).to.eql(new Error('Something went wrong'));

        done();
      });
    });
  });
});

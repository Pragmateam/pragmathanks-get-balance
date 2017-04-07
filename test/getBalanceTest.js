const expect = require('chai').expect;
const sinon = require('sinon');
const google = require('googleapis');

const getBalance = require('../src/getBalance');

describe('getBalance', () => {
  sinon.stub(google, 'sheets').withArgs('v4');

  const sheets = {
    spreadsheets: {
      values: {
        get: (credentials, callback) => {
          callback();
        },
      },
    },
  };

  it('returns empty balance message', (done) => {
    google.sheets.returns(sheets);

    getBalance('alabeduarte').then((balance) => {
      expect(balance).to.eql('Your balance is 0 and you have 0 to give');

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

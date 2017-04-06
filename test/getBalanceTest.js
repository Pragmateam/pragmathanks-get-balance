const expect = require('chai').expect;
const getBalance = require('../src/getBalance');

describe('getBalance', () => {
  it('returns empty balance message', () => {
    expect(getBalance('alabeduarte')).to.eql('Your balance is 0 and you have 0 to give');
  });
});

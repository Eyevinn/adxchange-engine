const MockupExchange = require('../../engine/modules/mockup.js');

describe('Mockup Module', () => {
  it('returns a mockup response', done => {
    const mockup = new MockupExchange();
    mockup.generateMockupResponse().then(payload => {
      expect(payload).toEqual('mockup response');
      done();
    });
  });
});
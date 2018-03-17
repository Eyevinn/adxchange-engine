const AdxEngine = require('../index.js');
const MockupExchange = require('../engine/modules/mockup.js');

describe('AdxEngine', () => {
  it('can provide a mockup module', done => {
    const Exchange = AdxEngine.exchange('MockupExchange');
    expect(Exchange).toBe(MockupExchange);
    const mockup = new Exchange();
    done();
  });
});
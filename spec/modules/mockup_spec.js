const MockupExchange = require('../../engine/modules/mockup.js');
const DOMParser = require('xmldom').DOMParser;

describe('Mockup Module', () => {
  it('returns a mockup response', done => {
    const mockup = new MockupExchange();
    mockup.generateMockupResponse().then(payload => {
      const doc = new DOMParser().parseFromString(payload, 'text/xml');
      expect(doc.hasChildNodes()).toBe(true);
      const vast = doc.getElementsByTagName("VAST");
      expect(vast).toBeDefined();
      done();
    });
  });
});
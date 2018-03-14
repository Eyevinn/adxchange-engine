const restify = require('restify');
const errs = require('restify-errors');
const debug = require('debug')('engine-server');

const MockupExchange = require('./modules/mockup.js');

class AdxEngine {
  constructor() {
    this.server = restify.createServer();
    this.mockup = new MockupExchange();

    this.server.get('/mockup', this.mockup.handleRequest.bind(this.mockup));
  }

  listen(port) {
    this.server.listen(port, () => {
      debug('%s listening at %s', this.server.name, this.server.url);
    });
  }
}

module.exports = AdxEngine;
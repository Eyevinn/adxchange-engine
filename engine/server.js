const restify = require('restify');
const errs = require('restify-errors');
const debug = require('debug')('engine-server');

const MockupExchange = require('./modules/mockup.js');

const ExchangeModules = {
  'MockupExchange': MockupExchange,
};

class AdxEngine {
  constructor() {
    this.server = restify.createServer();
    this.mockup = new (ExchangeModules['MockupExchange'])();

    this.server.get('/mockup', this.mockup.handleRequest.bind(this.mockup));
  }

  listen(port) {
    this.server.listen(port, () => {
      debug('%s listening at %s', this.server.name, this.server.url);
    });
  }

  static exchange(exchangeModule) {
    return ExchangeModules[exchangeModule];
  }
}

module.exports = AdxEngine;
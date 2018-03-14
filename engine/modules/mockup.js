const errs = require('restify-errors');
const debug = require('debug')('module-mockup');

class MockupExchange {
  constructor() {

  }

  handleRequest(req, res, next) {
    debug(`Handle request`);
    this.generateMockupResponse().then(payload => {
      res.send(payload);
      next();
    }).catch(err => {
      next(this._errorHandler(err));
    })
  }

  generateMockupResponse() {
    return new Promise((resolve, reject) => {
      debug(`Generate mockup response`);
      resolve('mockup response');
    });
  }

  _errorHandler(errMsg) {
    console.error(errMsg);
    const err = new errs.InternalServerError(errMsg);
    return err;
  }
}

module.exports = MockupExchange;
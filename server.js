const AdxEngine = require('./index.js');

const engine = new AdxEngine();
engine.listen(process.env.PORT || 7000);
The Eyevinn Adxchange Engine is a microservice placed between the server-side ad-insertion component and the adserver or SSP.

It currently provides the following API:

Resource | Method | Response | Module | Description
-------- | ------ | -------- | ------ | -----------
/mockup | GET | VAST XML | MockupExchange | Returns a mockup VAST XML that can be used for testing


## Node Module

```
$ npm install --save eyevinn-adxchange-engine
```

To use the Adxchange Engine in your NodeJS code you initiate the engine like this:

```
  const AdxEngine = require('eyevinn-adxchange-engine');

  const engine = new AdxEngine();
  engine.listen(process.env.PORT || 7000);
```

or if you want to use a specific module and not setup a server.

```
  const Exchange = AdxEngine.exchange('MockupExchange');
  const mockup = new Exchange();
  mockup.generateMockupResponse().then(payload => {
    console.log(payload);
  });
  
```
The Eyevinn Adxchange Engine is a microservice placed between the server-side ad-insertion component and the adserver or SSP.

It currently provides the following API:

Resource | Method | Response | Description
-------- | ------ | -------- | -----------
/mockup | GET | VAST XML | Returns a mockup VAST XML that can be used for testing


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

const errs = require('restify-errors');
const debug = require('debug')('module-mockup');
const xml = require("xml");
const VAST = require('vast-xml');

const selectAd = (vast, params) => {
  if (params.profile === "1") {
    createAd(vast, apotea, params)
  } else if(params.profile === "2") {
    createAd(vast, grannyra, params)
    createAd(vast, sff, params)
  }
}

const createAd = (vast, adObject, params) => {
  const ad = vast.attachAd({
    id: adObject.id,
    structure: 'inline',
    AdTitle: adObject.title,
    Description: 'Dummy ad',
    AdSystem: {
      name: 'mock',
      version: '1.0'
    }
  });

  const creative = ad.attachCreative('Linear', {
    AdParameters : '<xml></xml>',
    Duration: adObject.duration,
  });
  if(adObject.impression){
    ad.attachImpression({
      id: 'mock-server',
      url: params.trackingUrl + '/tracking?AdId='+ adObject.id +'&Profile=' + params.profile,
    })
  }
  creative.attachMediaFile(adObject.url, {
    type: "video/mp4",
    id: adObject.id,
    bitrate: "11421",
    minBitrate: "11421",
    maxBitrate: "11421",
    width: "1280",
    height: "720",
    scalable: "true",
    maintainAspectRatio: "true",
    codec: ""
  });
  creative.attachVideoClick('ClickThrough', 'https://tv.eyevinn.technology', Math.floor(Math.random() * 100));
}

const apotea = {
  id: "video-apotea-impression",
  title: "Apotea-15s",
  duration: "00:00:15",
  url: "https://testcontent.eyevinn.technology/ads/apotea-15s.mp4",
  impression: true,
}

const grannyra = {
  id: "video-grannyra-impression",
  title: "Grannyra-10s",
  duration: "00:00:10",
  url: "https://testcontent.eyevinn.technology/ads/grannyra-10s.mp4",
  impression: true,
}

const sff = {
  id: "video-sff-impression",
  title: "SvenskFF-15s",
  duration: "00:00:15",
  url: "https://testcontent.eyevinn.technology/ads/sff-15s.mp4",
  impression: true,
}

const PROFILES = [ "1", "2" ];

class MockupExchange {
  constructor() {

  }

  handleRequest(req, res, next) {
    res.set('Content-Type', 'application/xml');
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
      const vast = new VAST({version: "4.0"});
      const mockParams = {
        profile: PROFILES[Math.floor(Math.random() * PROFILES.length)],
        trackingUrl: 'https://adxchange.api.eyevinn.technology/mockup',
      }
      selectAd(vast, mockParams)
      resolve(vast.xml({ pretty : true, indent : '  ', newline : '\n' }));
    });
  }

  _errorHandler(errMsg) {
    console.error(errMsg);
    const err = new errs.InternalServerError(errMsg);
    return err;
  }
}

module.exports = MockupExchange;
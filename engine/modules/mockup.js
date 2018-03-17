const errs = require('restify-errors');
const debug = require('debug')('module-mockup');
const xml = require("xml");
const VAST = require('vast-xml');

const selectAd = (vast, params) => {
  if(params.profile === "1"){
    createAd(vast, preroll, params)
    createAd(vast, volvo, params)
    createAd(vast, postroll, params)
  }else if(params.profile === "2"){
    createAd(vast, preroll, params)
    createAd(vast, umeaenergi, params)
    createAd(vast, postroll, params)
  }
}

const createAd = (vast, adObject, params) => {
  const ad = vast.attachAd({
    id: adObject.id,
    structure: 'inline',
    AdTitle: adObject.title,
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
      url: params.trackingUrl + '/track?AdId='+ adObject.id +'&Profile=' + params.profile + '&Channel=' + params.channel
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
}

const preroll = {
  id: "preroll-video",
  title: "preroll",
  duration: "00:00:10",
  url: 'http://cdn.lab.eyevinn.technology/ads/TV4-PreRoll-Reklam.mp4',
  impression: false,
}

const volvo = {
  id: "video-volvo-impression",
  title: "VolvoS90LuxurySedanSongoftheOpenRoad-30s",
  duration: "00:00:30",
  url: "http://cdn.lab.eyevinn.technology/ads/VolvoS90LuxurySedanSongoftheOpenRoad-30s.mp4",
  impression: true,
}

const umeaenergi = {
  id: "video-UmeaEnergi-impression",
  title: "video-ad-UmeaEnergi",
  duration: "00:00:30",
  url: "http://cdn.lab.eyevinn.technology/ads/UmeaEnergi-Bredband-30s.mp4",
  impression: true,
}

const postroll = {
  id: "video-post",
  title: "video-postroll",
  url: "http://cdn.lab.eyevinn.technology/ads/TV4-PostRoll-Reklam.mp4",
  duration: "00:00:10",
  impression: false,
}

const mockParams = {profile: ["1", "2"][Math.floor(Math.random())]}

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
const { TRACKING_PARAMS } = require('../config');

exports.addUrlProtocolIfMissing = (url) =>
  url.startsWith('http://') || url.startsWith('https://')
    ? url
    : `https://${url}`;

exports.getTrackingParamData = (dirtyUrl) => {
  const urlObj = new URL(dirtyUrl);

  const urlData = {
    url: dirtyUrl,
    isDirty: false,
    trackingParams: [],
    cleanUrl: dirtyUrl,
  };

  // If bad params are found, mark url as dirty,
  // add trackingParams entry, and set cleanUrl
  // as url with that param removed
  TRACKING_PARAMS.forEach((badParam) => {
    if (urlObj.searchParams.has(badParam)) {
      urlData.isDirty = true;
      urlData.trackingParams.push({
        key: badParam,
        value: urlObj.searchParams.get(badParam) || '',
      });
      urlObj.searchParams.delete(badParam);
      urlData.cleanUrl = urlObj.href;
    }
  });

  return urlData;
};

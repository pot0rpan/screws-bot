exports.addUrlProtocolIfMissing = (url) =>
  url.startsWith('http://') || url.startsWith('https://')
    ? url
    : `https://${url}`;

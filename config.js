exports.PREFIX = 's>';
exports.BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://scre.ws'
    : 'http://localhost:3000';
exports.API_URL = this.BASE_URL + '/api/url';

// Command stuff
exports.TRACKING_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'utm_brand',
  'utm_name',
  'fbclid',
];

// Message embed stuff
exports.COLOR_PRIMARY = 58044; // Scre.ws primary green
exports.COLOR_DANGER = 16384133; // Scre.ws danger
exports.FOOTER = {
  text: 'Thank you for using Scre.ws',
  icon_url: `https://scre.ws/favicon-32x32.png`,
};

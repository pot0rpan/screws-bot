exports.PREFIX = 's>';
exports.BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://scre.ws'
    : 'http://localhost:3000';
exports.API_URL = this.BASE_URL + '/api/url';

// Message embed stuff
exports.COLOR = 58044; // Scre.ws primary green
exports.FOOTER = {
  text: 'Thank you for using Scre.ws',
  icon_url: `https://scre.ws/favicon-32x32.png`,
};

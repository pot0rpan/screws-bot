const { MessageEmbed } = require('discord.js');

const { COLOR_DANGER, FOOTER } = require('../config');
const { addUrlProtocolIfMissing, getTrackingParamData } = require('../utils');
const { validate, VALIDATOR_URL } = require('../utils/validators');

/*
 * Usage: clean [url]
 */
module.exports = {
  name: 'clean',
  description: 'Clean a URL of tracking parameters',
  execute: async (msg, args) => {
    let [url = ''] = args;

    // Verify input
    url = addUrlProtocolIfMissing(url.trim());
    if (!validate(url, [VALIDATOR_URL()])) {
      return msg.channel.send('Please provide a valid URL.');
    }

    const trackingData = getTrackingParamData(url);

    if (!trackingData.isDirty) {
      return msg.channel.send('No tracking parameters detected.');
    }

    const fields = [
      ...trackingData.trackingParams.map((param) => ({
        name: param.key,
        value: param.value,
        inline: true,
      })),
      {
        name: '\u200B',
        value: '\u200B',
      },
      {
        name: 'Clean URL',
        value: trackingData.cleanUrl,
      },
      {
        name: 'Original URL',
        value: trackingData.url,
      },
    ];

    const embed = new MessageEmbed({
      title: 'Tracking parameters detected!',
      color: COLOR_DANGER,
      fields,
      footer: FOOTER,
    });

    msg.channel.send(embed);
  },
};

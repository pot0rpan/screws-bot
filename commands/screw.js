const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

const { API_URL, BASE_URL, FOOTER, COLOR } = require('../config');
const { addUrlProtocolIfMissing } = require('../utils');
const {
  validate,
  VALIDATOR_URL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_SAFECODE,
} = require('../utils/validators');

/*
 * Usage: screw [url] [code?]
 */
module.exports = {
  name: 'screw',
  description: 'Shorten a URL',
  execute: async (msg, args) => {
    let [longUrl = '', code = ''] = args;
    let createdUrl;

    // Verify inputs
    longUrl = addUrlProtocolIfMissing(longUrl.trim());
    if (!validate(longUrl, [VALIDATOR_URL()])) {
      return msg.channel.send('Please provide a valid URL.');
    }

    code = code.trim();
    if (
      code &&
      !validate(code, [
        VALIDATOR_MINLENGTH(4),
        VALIDATOR_MAXLENGTH(32),
        VALIDATOR_SAFECODE(),
      ])
    ) {
      return msg.channel.send(
        'That code is invalid. Only letters, numbers, and `-` are allowed, and must be 4-32 characters long. You can also leave it blank for a random code.'
      );
    }

    try {
      const res = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          longUrl,
          code,
          password: '',
          expirationHours: -1,
        }),
      });

      const { url, message: errorMessage } = await res.json();

      if (errorMessage) {
        return msg.channel.send(errorMessage);
      }

      createdUrl = url;
    } catch (err) {
      console.error(err);
      return msg.channel.send(
        'Uh oh, something went wrong while shortening that URL. Maybe try again?'
      );
    }

    const embed = new MessageEmbed({
      title: 'Your shortened URL is ready',
      description: `For more features visit ${BASE_URL}`,
      color: COLOR,
      fields: [
        { name: 'Shortened URL', value: `${BASE_URL}/${createdUrl.code}` },
        { name: 'Original URL', value: createdUrl.longUrl },
      ],
      footer: FOOTER,
    });

    const dm = await msg.author.createDM();
    dm.send(embed);

    // Only send this if not already in a dm
    if (msg.guild) {
      msg.channel.send(
        `Hey ${msg.author.username},\nI just sent the shortened URL to your direct messages.`
      );
    }
  },
};

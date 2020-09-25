const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

const { API_URL, COLOR, FOOTER } = require('../config');
const { addUrlProtocolIfMissing } = require('../utils');
const { validate, VALIDATOR_URL } = require('../utils/validators');

/*
 * Usage: unscrew [url]
 */
module.exports = {
  name: 'unscrew',
  description: 'Preview a URL',
  execute: async (msg, args) => {
    let [url = ''] = args;
    let urlData;

    // Verify input
    url = addUrlProtocolIfMissing(url.trim());
    if (!validate(url, [VALIDATOR_URL()])) {
      return msg.channel.send('Please provide a valid URL.');
    }

    try {
      const res = await fetch(`${API_URL}/unscrew`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.SCREWS_API_KEY,
        },
        body: JSON.stringify({
          url,
        }),
      });

      const data = await res.json();

      if (data.message) {
        return msg.channel.send(data.message);
      }

      urlData = data;
    } catch (err) {
      console.error(err);
      return msg.channel.send(
        'Uh oh, something went wrong while looking up that URL. Maybe try again?'
      );
    }

    // Conditionally add fields based on available data
    const fields = [];
    let image;
    if (urlData.redirected) {
      fields.push(
        {
          name: 'URL was redirected from',
          value: urlData.requestUrl,
          inline: true,
        },
        {
          name: 'to',
          value: urlData.responseUrl,
          inline: true,
        }
      );
    }
    if (urlData.preview) {
      const { preview } = urlData;

      if (preview.title) {
        fields.push({
          name: 'Page title',
          value: preview.title,
        });
      }
      if (preview.description) {
        fields.push({
          name: 'Page description',
          value: preview.description,
        });
      }

      if (preview.image.url) {
        image = {
          url: urlData.preview.image.url,
        };
      }
    }

    const embed = new MessageEmbed({
      title: "Here's what I found",
      color: COLOR,
      fields,
      image,
      footer: FOOTER,
    });

    msg.channel.send(embed);
  },
};

const { MessageEmbed } = require('discord.js');

const { COLOR, FOOTER } = require('../config');

module.exports = {
  name: 'help',
  description: 'Command help',
  execute(msg, _args) {
    const embed = new MessageEmbed({
      title: 'Available commands:',
      color: COLOR, // Scre.ws primary green
      fields: [
        {
          name: '`screw [url] [code?]`',
          value: 'Shorten a URL with an optional code, random by default',
        },
        {
          name: '`unscrew [url]`',
          value: 'Get a preview of where a URL leads',
        },
      ],
      footer: FOOTER,
    });

    msg.channel.send(embed);
  },
};

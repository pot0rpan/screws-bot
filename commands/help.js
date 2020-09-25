const { MessageEmbed } = require('discord.js');

const { COLOR_PRIMARY, FOOTER } = require('../config');

module.exports = {
  name: 'help',
  description: 'Command help',
  execute(msg, _args) {
    const embed = new MessageEmbed({
      title: 'Available commands:',
      color: COLOR_PRIMARY,
      fields: [
        {
          name: '`screw [url] [code?]`',
          value: 'Shorten a URL with an optional code, random by default',
        },
        {
          name: '`unscrew [url]`',
          value: 'Get a preview of where a URL leads',
        },
        {
          name: '`clean [url]`',
          value: 'Remove all tracking parameters from a url',
        },
      ],
      footer: FOOTER,
    });

    msg.channel.send(embed);
  },
};

require('dotenv').config();
const Discord = require('discord.js');

const { PREFIX, COLOR_DANGER } = require('./config');
const botCommands = require('./commands');

const bot = new Discord.Client();
bot.login(process.env.BOT_TOKEN);

// Add commands
bot.commands = new Discord.Collection();
Object.keys(botCommands).map((key) => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

bot.on('ready', () => {
  console.info('Logged in as ' + bot.user.tag);
});

bot.on('message', (msg) => {
  const args = msg.content.split(/ +/);
  const prefix = (args.shift() || '').toLowerCase();
  const command = (args.shift() || '').toLowerCase();

  if (msg.author.bot || prefix !== PREFIX) {
    return;
  }

  if (!bot.commands.has(command)) {
    return bot.commands.get('help').execute(msg);
  }
  try {
    bot.commands.get(command).execute(msg, args);
  } catch (err) {
    console.error(err);

    const owner = bot.users.cache.get(process.env.OWNER_DISCORD_ID);

    msg.channel.send(
      'Uh oh, there was an error executing that command.' +
        (owner ? " I'll alert my owner." : '')
    );

    if (!owner) return;

    const embed = new Discord.MessageEmbed({
      title: 'Hey something broke',
      description: 'Command: `' + `${command} ${args.join(' ')}` + '`',
      color: COLOR_DANGER,
      timestamp: Date.now(),
    });

    owner.send(embed).catch((err) => console.error(err));
  }
});

require('dotenv').config();
const Discord = require('discord.js');

const { PREFIX } = require('./config');
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

  if (msg.author.bot || prefix !== PREFIX || !bot.commands.has(command)) {
    return;
  }

  try {
    bot.commands.get(command).execute(msg, args);
  } catch (err) {
    console.error(err);
    msg.reply('Uh oh, there was an error executing that command.');
  }
});

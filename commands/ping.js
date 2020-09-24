module.exports = {
  name: 'ping',
  description: 'Ping!',
  execute(msg, _args) {
    msg.channel.send('pong');
  },
};

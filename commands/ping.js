const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, color, config) => {
  let m = await message.channel.send('<a:loading:785559393449017394> | Pingando...');
  await m.delete({timeout: 100})

  const embed = new Discord.MessageEmbed()
  .setTitle(`⚙️| Bot Latency`)
  .setDescription(`> **API:** <a:network:888962796019138571>\`${Math.round(client.ws.ping)}ms\` \n \n > **Guild:** <a:network:888962796019138571>\`${m.createdTimestamp - message.createdTimestamp}ms\` \n \n > **Instabilities??** See our [status](${config.statusURL})`)
  .setColor(color)
  .setTimestamp();

  message.channel.send(embed)
}
const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, color, config) => {
  const embed = new Discord.MessageEmbed()
  .setTitle(`:thumbsup: | Help`)
  .setDescription(` My Commands:`)
  .addField(`\`${prefix}help\` - Show this embed!
  
  \`${prefix}ping\` - Show the bot ping!
  
  \`${prefix}setconfig\` - Enable the captcha in your server!
  
  \`${prefix}verify\` - Verifies you with the captcha!`)

  message.channel.send(embed);
}
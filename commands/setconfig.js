const Discord = require('discord.js');
const db = require('quick.db');

module.exports.run = async (client, message, args, prefix, color, config) => {
  const embd = new Discord.MessageEmbed()
  .setTitle(`<a:HYpositive:763111725510950932> | Command: ${prefix}setconfig`)
  .setImage('https://cdn.discordapp.com/attachments/777870529704493106/891098520449327124/unknown.png')
  .setColor(color)
  .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}setconfig <true || false> <role id>`)
  .addField(`👍 | Observation:`, `<a:HYseta1:756119648654852106> Use **true** to activate the commmand and **false** to desactivate.`)
  .setFooter(`© HypedGroupCode`);
   
  if(!args[0]) return message.channel.send(embd)
  if(!args[1]) return message.channel.send(embd)

  if(args[0] === "false") {
    message.channel.send(`:x: | I turned the captcha off!`)
    db.set(`isGuild_${message.guild.id}`, false)
    return;
  }
  if(args[0] === "true") db.set(`isGuild_${message.guild.id}`, true)
  
  db.set(`role_${message.guild.id}`, args[1])
  message.channel.send(`:white_check_mark: | Captcha activated! I will add the role when someone completes the captcha! \n \n To do the captcha use: **${prefix}verify**`)
}
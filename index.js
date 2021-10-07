//✅> Calling the packages 
const Discord = require('discord.js');
const express = require('express');
const db = require('quick.db');
const fs = require('fs');

//✅> Calling Archives
const config = require('./config.json');

const TOKEN = process.env.TOKEN
const PORT = process.env.PORT

//✅> Variables
const client = new Discord.Client();
const botconfig = config;
const app = express();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

//✅> DisbutClient
require('discord-buttons')(client);

//✅> Command Reader
fs.readdir("./commands/", (err, files) => {
  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("❌| Não achei nenhum comando!");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`-> ${f} loaded!`);
    client.commands.set(props.help, props);

  });

});

//✅> Command Handler
client.on('message', async (message) => {
  // > > > Multi Prefix < < < 
  let prefixes = JSON.parse(fs.readFileSync("./database/prefixes.json", "utf8"));
    if (message.channel.type == 'dm') return;
    if(!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefix: config.defaultPrefix
     }
    }
    let prefix = prefixes[message.guild.id].prefix;

    // > > > Multi Color < < < 
    let colors = JSON.parse(fs.readFileSync("./database/colors.json", "utf8"));
    if (!colors[message.guild.id]) {
    colors[message.guild.id] = {
      color: config.defaultColor
      }
    }
  let color = colors[message.guild.id].color;

  if(message.channel.type == 'dm') return;
  if(message.author.bot) return;

  if(message.content.startsWith(`<@!${client.user.id}>`||`@${client.username}`)) {
    message.channel.send(`Hi, my prefix is \`${prefix}\`, use \`${prefix}help\` and see my commands!`)
  }
  if(!message.content.toLowerCase().startsWith(prefix)) return;

  const args = message.content
        .trim().slice(prefix.length)
        .split(/ +/g);
  let command = args.shift().toLowerCase();
  //aliases
  if(command === "e") command = "eval";

  try {
    const commandFile = require(`./commands/${command}.js`)
    commandFile.run(client, message, args, prefix, color, config);
    console.log(`${message.guild.name}: ${message.author.tag} Usou ${command} no #${message.channel.name}`)
  } catch (err) {
    console.error('❌| Erro:' + err);
  }
});

//Console Físico
client.on("ready", () => {
  /*
  var content = "Está tudo Ok";
  var channel = client.guilds.cache.get("777870393137430589").channels.cache.get("777870601243197451");
  setInterval(function() {
    channel.send(content); 
  }, 100 * 60 * 60 * 1); 
  channel.send(content);
  */
  console.log("✅| It's all ok!");
})

//Porta express
app.get("/", (request, response) => {
  const ping = new Date();
  response.send(`<html><head><style>
    body {
        background-color: #2C2F33;
        font-family: 'Roboto', sans-serif;
    }

    .outer-container {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #23272A;
        box-shadow: 0px 0px 10px #1B1E21;
        border-radius: 50px;
        width: 45%;
    }

    .plasma {
        color: #ffffff;
        font-size: 70px;
        margin: 0;
        font-weight: 400;
        text-align: center;
    }

    .ends {
        color: #ffffff;
        font-size: 35px;
        margin: 0;
        text-align: center;
    }

    .date {
        color: #99AAB5;
        font-size: 25px;
        margin: 0;
        padding-bottom: 50px;
        text-align: center;
    }

    .logo {
        max-width: 100%;
        height: auto;
        width: auto\9;
        margin: 0;
    }
</style>

<link href="https://fonts.googleapis.com/css2?family=Roboto&amp;display=swap" rel="stylesheet">
<link rel="shortcut icon" type="image/x-icon" href="https://static.wixstatic.com/media/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png">

<title>Status Do Hyped</title>

</head><body><div class="outer-container" wfd-id="0">
    <div class="container" wfd-id="1">
        <img src="https://botlist.hypeds.com/img/logo.png" class="logo">
        <p class="plasma">Status Do Hyped</p>
        <p class="ends" id="ends">Status Da Host: Online</p>
        <p class="date" id="date">Status Do Site: Online</p>
    </div>
</div>
</body></html>`)
  ping.setHours(ping.getHours() -3 );
  console.log(`⚠️ | Ping recived: ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
})
app.listen(PORT)

//Código de ! Diogo06🐾#1337 Não Disturbe
client.login(TOKEN);
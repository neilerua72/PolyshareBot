

const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  if (!args[0] || !args[1])
  return message.reply(
    "Syntaxe : !send <channel> <message>"
  );
  let nameChannel = args[0];
  let messageSend=""
  for(let i=1;i<args.length;i++){
  messageSend+=args[i]+" ";
  }


  const channel = message.guild.channels.cache.find(
  ch => ch.name === nameChannel
  );
  // Do nothing if the channel wasn't found on this server
  if (!channel) return message.channel.send("Channel non trouvé");

  channel.send(messageSend);
  message.channel.send("Message envoyé sur le channel "+nameChannel);
}

module.exports.help={
  name: "send"
}

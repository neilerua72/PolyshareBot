const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  if (!message.member.hasPermission("MANAGE_MESSAGE"))
    return message.reply("Vous n'avez pas la permission");
  if (!args[0] || !args[1])
    return message.reply(
      "Syntaxe : !clear <channel> <le nombre de message a supprimer>"
    );
  let nameChannel = args[0];
  let nbDeMessages = args[1];

  const channel = message.guild.channels.cache.find(
    ch => ch.name === nameChannel
  );
  // Do nothing if the channel wasn't found on this server
  if (!channel) return message.channel.send("Channel non trouvé");
  // Send the message, mentioning the member

  channel.bulkDelete(nbDeMessages).then(() => {
    message.channel.send("Channel "+nameChannel+" a été clear de "+nbDeMessages+" messages.");
  });
}

module.exports.help={
  name: "clear"
}

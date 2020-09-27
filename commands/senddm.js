

const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  if (!args[0] || !args[1])
  return message.reply(
    "Syntaxe : !senddm <id> <message>"
  );
  let id = args[0];
  let messageSend=""
  for(let i=1;i<args.length;i++){
  messageSend+=args[i]+" ";
  }


  const personne = message.guild.members.resolve(id)
  personne
    .createDM()
    .then(channel => {
      channel.send(messageSend);
      return message.channel.send("Message envoyé à l'identifiant : "+id);

    })
    .catch(()=>{
      if(!personne)
      message.channel.send("Personne non trouvé")});


  // Do nothing if the channel wasn't found on this server


}

module.exports.help={
  name: "senddm"
}

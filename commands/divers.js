
const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  const LENA = "668961765593448449"; //Mettre l'id de Léna ici
  if (message.channel.name === "spam") {
    console.log("ça marche");
    if (message.author.id === LENA) {
      message.reply("Ferme ta gueule Léna ptn !");
    }
  }

  if (message.channel.type === "dm"){
    if(message.author.bot) return;
    bot.channels.resolve("693977899690360832").send(
      `**Message de ` +
        message.author.username +
        ` : **
  ` +
        message.content
    );
  }

}

module.exports.help={
  name: "divers"
}

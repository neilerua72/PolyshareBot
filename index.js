const Discord = require("discord.js");
const config = require("./config.json");
const chan = require("./chan.json");
const bot = new Discord.Client();
const fs = require('fs');
const progra = require('./progra.js');
  const description ="Liste des formation pour ce jour. Soyez à l'heure et n'oubliez pas de rejoindre le salon vocal et de couper votre micro.";
  const title= "Les formations du jour :"



bot.commands = new Discord.Collection();
fs.readdir('./commands/',(err,files)=>{
  if(err) console.log(err);
  let jsFile=files.filter(f =>f.split('.').pop()==='js');
  if(jsFile.length<=0){
    console.log("Je ne trouve pas la commande");
    return
  }
  jsFile.forEach((f, i) => {
    let props  = require(`./commands/${f}`);
    bot.commands.set(props.help.name, props);
  });
})

bot.commands.set(progra.help.name,progra);
const PRE = config.prefix;
const BOT = "693899604030259241";

bot.on("ready", function() {
  console.log("Bot opérationnel");
});

bot.on("message", message => {
  let commandFile=bot.commands.get("divers");
  let args="";
  if(commandFile) commandFile.run(bot,message,args);

  //TESTEUR DE COMMANDE
  if (message.channel.name === "gestionbot") {
    if (message.author.bot) return;

      if (message.content[0] === PRE) {
        let messageArray = message.content.split(" ");
        let command = messageArray[0];
        let args = messageArray.slice(1);


        let commandFile=bot.commands.get(command.slice(PRE.length));
        if(commandFile) commandFile.run(bot,message,args);
        else
          message.channel.send("Commande non trouvé, envoi un DM à l'administrateur pour qu'il voit le problème ;)")

      }else if(message.content[0]==="?"){
        const rappel ="698923629534249040";
        let messageEmbed = new Discord.MessageEmbed();
           messageEmbed = new Discord.MessageEmbed()
						.setTitle(title)
            .setDescription(description)
					  .setThumbnail('https://zupimages.net/up/20/15/g4ub.png')
          .addFields(
							{name: "A 14h :", value:bot.channels.resolve(chan.C20).toString()+ "et "+bot.channels.resolve(chan.C16).toString()},
              {name: "A 16h :", value:bot.channels.resolve(chan.C17).toString()+ "et "+bot.channels.resolve(chan.C09).toString() + "(Pour les clubs)"},
							{name: "A 18h30 :", value:bot.channels.resolve(chan.C24).toString()+ "et "+bot.channels.resolve(chan.C25).toString()},
						);
					
						message.channel.send(messageEmbed)


      }
    else {
        message.channel.send("Merci de commencer vos commandes par '!''");
      }

  }
});

/*bot.on("guildMemberAdd", member => {
  member
    .createDM()
    .then(channel => {
      return channel.send(
        `**Bienvenue sur le serveur de l'AG virtuelle FEDERP 2020**

Tout d'abord, merci de respecter les règles de bonnes conduites sur ce serveur, mais aussi de te renommer de la manière suivante :
			*Prenom Nom - Ville - Poste*

Nous te rappelons que la FEDERP se reserve le droit de t'exclure si elle juge un comportement non adapté et si ce dernier met en peril le bon déroulement de l'AG.
Si tu as la moindre question, n'hésite pas à m'envoyer un message ici. Les administrateurs recevront automatiquement ton message et voleront à ton secours ! Toute l'équipe de la federp et la nouvelle équipe te souhaitent une très bonne AG dans ces conditions un peu particulière.
			`
      );
    })
    .catch(console.error);
});*/

setInterval(function() {
  let commandFile=bot.commands.get("progra");
  if(commandFile) commandFile.run(bot);
}, 60000);

bot.login('NjkzODk5NjA0MDMwMjU5MjQx.XoX-iw.0s7oqOKfTYszDZhU9699VhCfdgg')


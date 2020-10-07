const Discord = require("discord.js");
const config = require("./config.json");
/*const chan = require("./chan.json");*/
const bot = new Discord.Client();
const fs = require('fs');
/*const progra = require('./progra.js');
  const description ="Liste des formation pour ce jour. Soyez à l'heure et n'oubliez pas de rejoindre le salon vocal et de couper votre micro.";
  const title= "Les formations du jour :"*/



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

/*bot.commands.set(progra.help.name,progra);*/
const PRE = config.prefix;
const BOT = "748933959194378372";

bot.on("ready", function() {
  console.log("Bot opérationnel");
});

bot.on("message", message =>{
  if (message.author.bot) return;

  // Gestion du bot
  if (message.channel.name === "gestion-bot") {
    if (message.author.bot) return;

      if (message.content[0] === PRE) {
        let messageArray = message.content.split(" ");
        let command = messageArray[0];
        let args = messageArray.slice(1);


        let commandFile=bot.commands.get(command.slice(PRE.length));
        if(commandFile) commandFile.run(bot,message,args);
        else
          message.channel.send("Commande non trouvé, envoi un DM à l'administrateur pour qu'il voit le problème ;)")

      }
    else if(message.content[0] === "?") {
      messageEmbed = new Discord.MessageEmbed()
                .setColor('#009CDD')
                 .setTitle(`**Bienvenue sur le serveur du Polyshare 2020**`)
                 .setThumbnail('https://zupimages.net/up/20/41/oauq.png')
                 .setDescription(`La team Sponsor de Polytech et APoG te souhaitent la bienvenue ici. Ce serveur est dédié aux échanges entre les participants. 


Rends toi sur le lien suivant (https://discord.com/invite/9QWgCSe), pour trouver différentes "salles". Tu pourras choisir ta salle **en fonction du sujet** qui t'intéresse. Par exemple, le canal `+bot.channels.resolve("759827229789257749").toString()+` te permettra d'échanger **à l'écrit** sur ce sujet. Les canaux notifiés d'un symbole :loud_sound: sont des salles qui te permettront d'échanger seulement **à l'oral**, donc branche ton casque et rejoins nous !


Si tu as perdu le lien pour suivre la vidéo en direct, c'est par ici : https://youtu.be/aiWohjjMwww ! 


_PS : réponds à ce message en envoyant ton nom, prénom et filière, afin que l'on puisse savoir si tu es adhérent et que l'on colore ton prénom en fonction de ta filière !_ :wink: 

A bientôt `);
                 message.channel.send(messageEmbed)


    }

    else{
        message.channel.send("Merci de commencer vos commandes par '!''");
      }

  }

  if (message.channel.type === "dm"){
   if(message.author.bot) return;
   messageEmbed = new Discord.MessageEmbed()
  						.setTitle("Message de " +  message.author.username + " | ID : "+message.author.id)
  						.setDescription(message.content);

   bot.channels.resolve("762725996729335819").send(messageEmbed);
 }
})
// Message d'entrée
bot.on("guildMemberAdd", member => {
  member
    .createDM()
    .then(channel => {
      console.log("Je suis passé ici")
				messageEmbed = new Discord.MessageEmbed()
                .setColor('#009CDD')
                 .setTitle(`**Bienvenue sur le serveur du Polyshare 2020**`)
                 .setThumbnail('https://zupimages.net/up/20/41/oauq.png')
                 .setDescription(`La team Sponsor de Polytech et APoG te souhaitent la bienvenue ici. Ce serveur est dédié aux échanges entre les participants. 


Rends toi sur le lien suivant (https://discord.com/invite/9QWgCSe), pour trouver différentes "salles". Tu pourras choisir ta salle **en fonction du sujet** qui t'intéresse. Par exemple, le canal `+bot.channels.resolve("759827229789257749").toString()+` te permettra d'échanger **à l'écrit** sur ce sujet. Les canaux notifiés d'un symbole :loud_sound: sont des salles qui te permettront d'échanger seulement **à l'oral**, donc branche ton casque et rejoins nous !


Si tu as perdu le lien pour suivre la vidéo en direct, c'est par ici : https://youtu.be/aiWohjjMwww ! 


_PS : réponds à ce message en envoyant ton nom, prénom et filière, afin que l'on puisse savoir si tu es adhérent et que l'on colore ton prénom en fonction de ta filière !_ :wink: 

A bientôt `);
      return channel.send(messageEmbed);
    })
    .catch(console.error);
});
/*
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
/*
setInterval(function() {
  let commandFile=bot.commands.get("progra");
  if(commandFile) commandFile.run(bot);
}, 60000);*/

bot.login('NzQ4OTMzOTU5MTk0Mzc4Mzcy.X0kpGg.7PwhUSwYO2cIBFGSQNjS2AU_LDw')

//Importación especifica de Metodos - RichEmbed - findUserID putEmoji Functions - Perms - stripIndents -  Emojis - nonecolor Color
const { MessageEmbed } = require("discord.js");
const { putEmoji } = require("../../utils/misc/functions");
const { stripIndents } = require("common-tags");
const {
  cancelado,
  synchronous,
  kyonax,
  clever,
  pixxa,
  afirmado,
  thrizz,
  pokemon,
  starcraft2,
  lol,
  csgo,
  mortalkombat,
  hearthstone,
  myb,
  minecraft,
  gtasa,
  gtav,
  anothergames,
  dst,
} = require("../../../database/utils/emojis/emojis.json");
const { noneColor } = require("../../../database/utils/color/color.json");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const StateManager = require("../../utils/database/StateManager");
//Exportación del Comando set
module.exports = class PutembedsCommand extends BaseCommand {
  constructor() {
    super(
      "putembeds",
      ["pembeds", "embedsput", "pem", "colocarembeds"],
      "Comando para **mandar** los mensajes **Embed** a los canales.",
      "putembeds <type>`",
      "***Pilares***",
      "owner"
    );
  }

  async run(bot, message, args) {
    //Eliminación del mensaje con Comandos
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    //Validación Permisos
    if (message.member.id != message.guild.ownerID)
      return perm.ownerPerms(bot, message);
    //Variables
    let autor = message.author;
    //Validación de Variables - Permisos de Comandos - Falta de Usuario - Falta de Razón - Auto Baneo
    const channell = args[0];
    let rulesChannel = message.guild.channels.cache.find(
      (ch) => ch.name === "📃-reglas-rules"
    );
    let sugeChannel = message.guild.channels.cache.find(
      (ch) => ch.name === "🧠-sugerencias"
    );
    let chatChannel = message.guild.channels.cache.find(
      (ch) => ch.name === "💬-vc-chat"
    );
    let mtaChannel = message.guild.channels.cache.find(
      (ch) => ch.name === "🏮-mta-server"
    );

    switch (channell) {
      case "rules" /* 
        Creación del Mensaje Embed de Reglas
        let embedRule = new MessageEmbed()
          .setTitle(`**📜 Reglas del Servidor 📜**`)
          .setDescription(
            "Todos deseamos tener una experiencia amena en este servidor por ese motivo te invito a que leas y cumplas las siguientes normas del **Servidor**."
          )
          .addBlankField(true)
          .attachFiles(["../../../database/multimedia/gifs/embeds/ServerRules.gif"])
          .setImage("attachment://ServerRules.gif")
          .setColor(nonecolor)
          .addField(
            "**REGLA NÚMERO 1:**",
            "Respetar, procura no faltarle el respeto a ninguna persona, todos merecemos respeto." +
              `\n`
          )
          .addField(
            "**REGLA NÚMERO 2:**",
            "_No política - No religión_, sabemos que todos tenemos creencias e ideologías políticas diferentes, por esa razón merecen respeto, y la mejor manera de brindar dicho respeto es no comentar nada al respecto, todos somos diferentes y debemos entender que no todos tenemos las mismas creencias o ideologías, este es un servidor de entretenimiento nada más. Gracias por su compresión." +
              `\n`
          )
          .addField(
            "**REGLA NÚMERO 3:**",
            "**NSFW**, En este canal puedes publicar todo lo que quieras, pero procura no publicar _pornografía, gore, vídeos extremos etc..._ en los canales que no tienen esta categoría." +
              `\n`
          )
          .addField(
            "**REGLA NÚMERO 4:**",
            "_Spam_, el Spam no es permitido en ningún canal, si haces _Spam_ en cualquier canal, te ganas un __**Warn**__ a los __**3 Warns**__ te expulsamos del servidor." +
              `\n`
          )
          .addField(
            "**REGLA NÚMERO 5:**",
            "Personal, procura no publicar información personal en los canales." +
              `\n`
          )
          .addField(
            "**REGLA NÚMERO 6:**",
            "No confundir **CANALES**, existen canales para casi cualquier cosa, úsalos para lo que fueron hechos." +
              `\n`
          )
          .addField(
            "**REGLA NÚMERO 7:**",
            "No a la _Discriminación_, no aceptamos ningún tipo de discriminación de ningún tipo." +
              `\n`
          )
          .addField(
            "**REGLA NÚMERO 8:**",
            "_Igualdad_, ningún tipo de persona o ser existente tiene prioridades, todos somos iguales." +
              `\n`
          )
          .addField(
            "**REGLA NÚMERO 9:**",
            "_Broma_, algunas de las reglas anteriores se pueden abolir si se demuestra que fue algo en broma, se le preguntará al afectade por los hechos y si reconoce que fue una broma se le perdonará la condena al agresor." +
              `\n`
          )
          .addBlankField(true)
          .addField(
            stripIndents`**> __Links__**`,
            `\n[Synchronous Fanpage](https://facebook.com/SynchronousTeam) | [Paypal Synchronous](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5LY2Y46Q7DSWL&source=url)`
          )
          .setFooter("Constitución política de Synchronous")

          .setTimestamp();

        rulesChannel.send(embedRule); */:
        break;
      case "sugerencias" /* 
        //Creación del Mensaje Embed de Reglas
        let embedSuge = new MessageEmbed()
          .setTitle(`**🧠 Sugerencias y Peticiones 🧠**`)
          .setDescription(
            "Siéntete libre de opinar acerca del servidor, tus _**Recomendaciones**_ o _**Peticiones**_ ayudarán a mejorar el Servidor." +
              `\n \n \n`
          )
          .addField(
            "**SUGERENCIAS**",
            `Cualquier _**Sugerencia**_ se tendrá en cuenta siempre y cuando beneficie al servidor y a sus miembros.\n`
          )
          .addField(
            "**PETICIONES**",
            `Las peticiones pueden abarcar un sin número de **posibilidades**, estás se cumplirán siempre y cuando estemos _**de acuerdo de cumplir dicha petición**_, un ejemplo sería:\n \nPuedes hacer una _**petición de comandos**_ para un _**Bot**_, si la persona que desarrolla acepta la petición, se procederá a **programar dicho comando**.`
          )
          .attachFiles(["../../../database/multimedia/gifs/embeds/Sugerencias.gif"])
          .setImage("attachment://Sugerencias.gif")
          .setColor(nonecolor)
          .addBlankField(true)
          .addField(
            stripIndents`**> __Links__**`,
            `\n[Synchronous Fanpage](https://facebook.com/SynchronousTeam) | [Paypal Synchronous](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5LY2Y46Q7DSWL&source=url)`
          )
          .setFooter("Guía turística de Synchronous")

          .setTimestamp();

        sugeChannel.send(embedSuge); */:
        break;

      case "chat" /* 
        //Creación del Mensaje Embed de Reglas
        let embedChat = new MessageEmbed()
          .setTitle(`**💬 Chat Y Meeting 💬**`)
          .setDescription(
            "En este Canal podrás _**conversar**_ mientras te encuentras en un canal de voz, por si no tienes micrófono." +
              `\n \n \n`
          )
          .addField(
            "**USO CORRECTO**",
            `la idea de este canal es darle la **oportunidad de hablar** a alguien que no tenga _**micrófono**_, mientras se habla por **chat de voz**.\n`
          )
          .addField(
            "**USO INCORRECTO**",
            `En este canal no puedes abusar del _**SPAM**_ ${putEmoji(
              bot,
              cancelado
            )}, tampoco información que **NO** tenga que ver con la conversación **llevada** por alguno de los canales de voz.`
          )
          .attachFiles(["../../../database/multimedia/images/embeds/Chat.gif"])
          .setImage("attachment://Chat.gif")
          .setColor(nonecolor)
          .addBlankField(true)
          .addField(
            stripIndents`**> __Links__**`,
            `\n[Synchronous Fanpage](https://facebook.com/SynchronousTeam) | [Paypal Synchronous](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5LY2Y46Q7DSWL&source=url)`
          )
          .setFooter("Guía turística de Synchronous")
          .setTimestamp();

        chatChannel.send(embedChat); */:
        break;
      case "welcome" /* 
        let embedImageWelcome = new MessageEmbed()
          .attachFiles(["../../../database/multimedia/gifs/embeds/WelcomeToTheServer.gif"])
          .setImage("attachment://WelcomeToTheServer.gif")
          .setColor(nonecolor);
        let embedWelcome = new MessageEmbed()
          .setTitle(`**🎉 Bienvenida/o al Servidor 🎉**`)
          .setDescription(
            "Para proceder a ser parte del Servidor te invito a que primero **leas** las reglas del\nServidor luego procedas a **escoger** un rol reaccionando respectivamente a tus \nintereses.\n\n*- **Apoya** al servidor con nuestro **Fanpage** y **Paypal** -*" +
              `\n \n \n`
          )
          .setColor(nonecolor)
          .addField(
            stripIndents`**> __Links__**`,
            `\n[Synchronous Fanpage](https://facebook.com/SynchronousTeam) | [Paypal Synchronous](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5LY2Y46Q7DSWL&source=url)`
          );
        let embedWelcomeDescription = new MessageEmbed()
          .setTitle("**⛩ Roles de Seguidores ⛩**")
          .setDescription(
            `Cuando escojes un **Rol** tendrás accesos especifícos que te **otorga** dicho rol\nsi escojes un **Rol de Seguidores** de algún **Pilar** sólo podrás ver los canales de\ndicho **Pilar**, si deseas ver los canales de todos los **Pilares** escoje el rol de\n**Seguidor Synks**.\n\n\n`
          )
          .addField(
            `**ROLES**`,
            `${putEmoji(bot, synchronous)} <@&623721843949305858>\n${putEmoji(
              bot,
              clever
            )} <@&623722226356715522>\n${putEmoji(
              bot,
              kyonax
            )} <@&623722640036593685>`,
            true
          )
          .addBlankField(true)
          .addField(
            `**ROLES**`,
            `${putEmoji(bot, pixxa)} <@&624069017916669973>\n${putEmoji(
              bot,
              thrizz
            )} <@&623725235040157716>\n${putEmoji(
              bot,
              afirmado
            )} <@&623722441600139275>`,
            true
          )
          .attachFiles(["../../../database/multimedia/embeds/PilaresGif.gif"])
          .setImage("attachment://PilaresGif.gif")
          .setColor(nonecolor);
        let embedSubsRoles = new MessageEmbed()
          .setTitle("**🏆 Roles de Suscriptores 🏆**")
          .setDescription(
            `Los benefecios de ser un **Suscriptor** depende de cada **Pilar** pero estos beneficios pueden contener desde **Betas de aplicaciones**, **Ediciones Gratuitas**, **Contenido Innedito**, **Sponsors** y mucho mucho más.\n\nPara obtener un rol de **Suscriptor** debes estar suscrito en los canales de **Twitch** de alguno de los **Pilares**, apoyarle con **Patreon** o de alguna otra manera de forma **monetaria**.\n\n\n`
          )
          .addField(
            `**ROLES**`,
            `${putEmoji(bot, synchronous)} <@&623716996587978752>\n${putEmoji(
              bot,
              clever
            )} <@&623718343966326834>\n${putEmoji(
              bot,
              kyonax
            )} <@&623721044439465984>`,
            true
          )
          .addBlankField(true)
          .addField(
            `**ROLES**`,
            `${putEmoji(bot, pixxa)} <@&624067184544579585>\n${putEmoji(
              bot,
              thrizz
            )} <@&623724655198601222>\n${putEmoji(
              bot,
              afirmado
            )} <@&623720400714465300>\n\n\n`,
            true
          )
          .addField(
            stripIndents`**> __Links__**`,
            `\n[CleverSea Twitch](https://www.twitch.tv/synk_cleversea) | [Kyonax Twitch](https://www.twitch.tv/synk_kyonax) | [Pixxa Twitch](https://www.twitch.tv/pixxa666) | [Thrizz Twitch](https://www.twitch.tv/lthrizz) | [Firehome Twitch](https://www.twitch.tv/firehome15)`,
            false
          )
          .attachFiles(["../../database/gifs/embeds/PilaresGif.gif"])
          .setImage("attachment://PilaresGif.gif")
          .setColor(nonecolor);
        let embedWelcomeGamesRoles = new MessageEmbed()
          .setTitle("**🎮 Roles de Juegos 🎮**")
          .setDescription(
            `Si quieres acceder a **Canales** dónde puedas **compartir** tus gustos acerca de tu **VideoJuego** favorito reacciona para que los **Canales de Voz** y **Texto** se activen para ti. Si deseas ver todos los **Canales de Videojuegos** usa el rol **Games**.\n\n\n`
          )
          .addField(
            `**ROLES**`,
            `${putEmoji(bot, lol)} <@&696786998609969254>\n${putEmoji(
              bot,
              pokemon
            )} <@&696787286502670336>\n${putEmoji(
              bot,
              mortalkombat
            )} <@&696787375107604530>\n${putEmoji(
              bot,
              hearthstone
            )} <@&696787566036254760>\n${putEmoji(
              bot,
              csgo
            )} <@&696788135425605732>\n${putEmoji(
              bot,
              myb
            )} <@&696790273824653372>`,
            true
          )
          .addBlankField(true)
          .addField(
            `**ROLES**`,
            `${putEmoji(bot, starcraft2)} <@&696787175756398645>\n${putEmoji(
              bot,
              minecraft
            )} <@&696787490140455054>\n${putEmoji(
              bot,
              gtasa
            )} <@&696787789533937704>\n${putEmoji(
              bot,
              gtav
            )} <@&696787662757036092>\n${putEmoji(
              bot,
              dst
            )} <@&696787962087604264>\n${putEmoji(
              bot,
              anothergames
            )} <@&696788347539947670>`,
            true
          )
          .attachFiles(["../../database/gifs/embeds/GamesChannels.gif"])
          .setImage("attachment://GamesChannels.gif")
          .setColor(nonecolor);
        message.channel.send(embedImageWelcome);
        message.channel.send(embedWelcomeDescription);
        message.channel.send(embedSubsRoles);
        message.channel.send(embedWelcomeGamesRoles);
        message.channel.send(embedWelcome); */:
        break;
      case "MTA":
        //Inicialización de Emojis y su Uso respectivo
        let emoji = putEmoji(bot, synchronous.emojiID[0].gtasa);
        if (message.guild.id != synchronous.guildID) emoji = "💰";
        let embedWelcomeMTA = new MessageEmbed()
          .setTitle("**🎮 Server MTA - Beta Cerrada 🎮**")
          .setDescription(
            `Para acceder al contenido de el **Servidor de MTA** dónde encontrarás ***actualizaciones, recompensas, canales y mucho más*** reacciona con este emoji ${emoji}.\n\n\n`
          )
          .addField(
            `**ROLES**`,
            `${emoji} <@&711582241071038485>\n<@&623723333585862667>\n<@&711592453144313897>\n<@&711592516473978940>\n<@&711592553560014878>\n<@&711592591765798963>\n<@&711592641753645117>\n<@&711592731029536799>\n<@&711592824759648366>\n<@&711592876110250096>\n<@&711593225290383450>`,
            true
          )
          .addField(
            `**ROLES**`,
            `<@&711582059025662053>\n<@&711582151279116338>\n<@&711592908725420122>\n<@&711592946209783808>\n<@&711592974672199729>\n<@&711593034436837437>\n<@&711593082902151169>\n<@&711593190775455836>\n<@&711593147754348565>\n<@&711593190775455836>\n<@&711593335768350721>`,
            true
          )
          .attachFiles(["database/multimedia/gifs/embeds/MTA.gif"])
          .setImage("attachment://MTA.gif")
          .setColor(noneColor);
        mtaChannel.send(embedWelcomeMTA).catch((err) => console.log(err));
        break;
      case "TEST":
        let embedTest = new MessageEmbed()
          .setTitle("🎉Bienvenida/o al Servidor de Discord Synchronous🎉")
          .setDescription(
            `**${message.author.username}** ahora eres miembro de nuestra gran comunidad de **Discord** y por ende te daré algunas ***pautas y consejos*** que necesitarás para disfrutar del **Servidor**.`
          )
          .addFields(
            { name: "\u200B", value: "\u200B" },
            {
              name: "**Bot Principal**",
              value:
                "Nuestro Servidor tiene un **Bot personalizado** que te será de mucha ayuda para **entretenerte, dar sugerencias, averiguar estadísticas y mucho mucho más**, para poder usarlo y ver sus comandos usa este **comando en cualquier canal de texto del Servidor:** `s!help`",
            },
            {
              name: "**Escoge un Rol**",
              value:
                "Para poder acceder a los **canales de Texto y Voz** debes elegir un Rol, para ello debes **dirigirte al canal de <#696103284129267812> y reaccionar con el emoji** correspondiente para ver los canales que deseas.",
            },
            {
              name: "**Lee las Reglas**",
              value:
                "Las reglas o normas son muy importantes en el Servidor, ellas nos **ayudan a mantener un mejor ambiente** y por ello es necesario que además de **Leer las reglas, también las Apliques**.\n\n_Si se rompe alguna regla se te dará un **warn**, si tienes muchos es muy posible que se te **bannee del Servidor**_",
            },
            {name:"**Contáctanos y Apóyanos**",value:"**[FacebookPage](https://www.facebook.com/SynchronousTeam) | [YouTube](https://www.youtube.com/channel/UCjSHbvH1VPOWXGC_Z5wEHwQ) | [Paypal](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5LY2Y46Q7DSWL&source=url)** "}
          )
          .setColor(noneColor)
          .attachFiles(["./database/multimedia/gifs/embeds/Welcome_Server.gif"])
          .setImage("attachment://Welcome_Server.gif");
        message.author.send(embedTest);
        break;
      default:
        return message.channel.send("No se encuentra el canal.");
    }
  }
};

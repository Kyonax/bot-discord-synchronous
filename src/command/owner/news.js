//Importación especifica de Metodos - RichEmbed - Perms - cautioncolor Color
const { MessageEmbed } = require("discord.js");
const { thrizzColor } = require("../../../database/utils/color/color.json");
const { addMessageToBin } = require("../../utils/misc/bin");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
//Exportación del Comando news
module.exports = class NewsCommand extends BaseCommand {
  constructor() {
    super(
      "news",
      ["nws", "noticias"],
      "Comando para **mandar** una **Notica al Servidor**",
      "news <type> <title> ¬ <description>`\n**Tipo:** `<server_discord>`, `<server_mta>`",
      "***Owner***",
      "owner"
    );
  }

  async run(bot, message, args) {
    addMessageToBin(bot, message);
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
    const type = args[0].toLowerCase();
    if (!type) return err.noTypeDigitNews(bot, message);
    let contentArgs = "";
    let key = "¬";
    let tittle = "None";
    let description = "None";
    for (var i = 1; i < args.length; i++) {
      contentArgs = contentArgs + " " + args[i];
      if (args[i].toString() === key) {
        tittle = contentArgs;
        contentArgs = message.content;
        break;
      }
    }
    tittle = tittle.replace("¬", "");
    contentArgs = contentArgs.replace("s!news", "");
    contentArgs = contentArgs.replace("server_discord", "");
    contentArgs = contentArgs.replace("server_mta", "");
    contentArgs = contentArgs.replace("¬", "");
    contentArgs = contentArgs.replace(tittle, "");
    description = contentArgs;
    //Embed
    const embed = new MessageEmbed()
      .setColor(thrizzColor)
      .setTitle(tittle)
      .setDescription(description)
      .setTimestamp()
      .addField("**Att**", `${autor}`, true)
      .addField(
        `**Noticia - [${type.toUpperCase()}]**`,
        `**Enviado desde ${message.channel}**`,
        true
      )
      .setFooter("Central de Periodismo Synchronous News");
    switch (type) {
      case "server_mta":
        embed.attachFiles(["database/multimedia/gifs/embeds/NewsMTA.gif"]);
        embed.setImage("attachment://NewsMTA.gif");
        const mtaChannel = message.guild.channels.cache.find(
          (ch) => ch.name === "⋉⧼🔔⧽⋊news-mta⦊"
        );
        if (!mtaChannel) {
          return message.guild.channels
            .create("⋉⧼🔔⧽⋊news-mta⦊", {
              type: "text",
              permissionOverwrites: [
                {
                  id: message.guild.roles.everyone,
                  deny: ["SEND_MESSAGES", "ATTACH_FILES"],
                  allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
                },
              ],
            })
            .catch((err) => console.log(err));
        }
        mtaChannel.send(embed).catch((err) => console.log(err));
        break;
      case "server_discord":
        embed.attachFiles([
          "database/multimedia/gifs/embeds/NewsSynchronous.gif",
        ]);
        embed.setImage("attachment://NewsSynchronous.gif");
        const serverChannel = message.guild.channels.cache.find(
          (ch) => ch.name === "⋉⧼💡⧽⋊news⦊"
        );
        if (!serverChannel) {
          return message.guild.channels
            .create("⋉⧼💡⧽⋊news⦊", {
              type: "text",
              permissionOverwrites: [
                {
                  id: message.guild.roles.everyone,
                  deny: ["SEND_MESSAGES", "ATTACH_FILES"],
                  allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
                },
              ],
            })
            .catch((err) => console.log(err));
        }
        serverChannel.send(embed).catch((err) => console.log(err));
        break;
      default:
        err.noTypeFoundNews(bot, message, type);
        break;
    }
  }
};

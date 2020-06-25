//Importación especifica de Metodos - getMember formateDate findUserID - RichEmbed - stripIndents - Perms
const { getMember } = require("../../utils/misc/functions");
const { MessageEmbed } = require("discord.js");
const { cleverColor } = require("../../../database/utils/color/color.json");
const { addMessageToBin } = require("../../utils/misc/bin");
//Importación Clase de Objetos - Conector Error
const Error = require("../../../database/conectors/error");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
//Exportación del Comando Suggestion
module.exports = class WhoisCommand extends BaseCommand {
  constructor() {
    super(
      "suggestion",
      ["sug", "sugerencia", "dato"],
      "Comando para **Sugerir _actualizaciones, cambios y contenido multimedia_** .",
      "suggestion <type> <text>`.\n**Tipo:** `<mta>`, `<server>`",
      "_***Todos***_",
      "guild"
    );
  }
  async run(bot, message, args) {
    addMessageToBin(bot, message);
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    const autor = getMember(message, message.author.id);
    const type = args[0].toLowerCase();
    const text = args.slice(1).join(" ");
    if (!type) return err.noTypeDigit(bot, message);
    if (!text) return err.noSuggestionDigit(bot, message);
    //Creación EMBED
    //Creación del Mensaje Embed del Comando
    let embed = new MessageEmbed()
      .setTitle(`**${autor.displayName}'s Suggestion 🧠**`)
      .setThumbnail(bot.user.displayAvatarURL())
      .setDescription(`${text}`)
      .setColor(cleverColor)
      .addField("**Usuario**", `${autor}`, true)
      .addField(
        `**Sugerencia - [${type.toUpperCase()}]**`,
        `**Enviado desde ${message.channel}**`,
        true
      )
      .setFooter("Sugerencias de miembros del Servidor")
      .setTimestamp();
    switch (type) {
      case "mta":
        const mtaChannel = message.guild.channels.cache.find(
          (ch) => ch.name === "⋉⧼📥⧽⋊sugerencias-mta⦊"
        );
        if (!mtaChannel) {
          return message.guild.channels
            .create("⋉⧼📥⧽⋊sugerencias-mta⦊", {
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
        mtaChannel.send(embed);
        break;
      case "server":
        const serverChannel = message.guild.channels.cache.find(
          (ch) => ch.name === "⋉⧼📥⧽⋊sugerencias⦊"
        );
        if (!serverChannel) {
          return message.guild.channels
            .create("⋉⧼📥⧽⋊sugerencias⦊", {
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
        serverChannel.send(embed);
        break;
      default:
        err.noTypeFound(bot, message, type);
        break;
    }
  }
};

//Importación especifica de Metodos - getMember formateDate findUserID - RichEmbed - stripIndents - Perms
const { getMember } = require("../../utils/misc/functions");
const { MessageEmbed } = require("discord.js");
const { kyoColor } = require("../../../database/utils/color/color.json");
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
    const SERVER = message.guild.name
    const text = args.slice(0).join(" ");
    if (!SERVER) return err.noTypeDigit(bot, message);
    if (!text) return err.noSuggestionDigit(bot, message);    
    //Creación EMBED
    //Creación del Mensaje Embed del Comando
    let embed = new MessageEmbed()
      .setTitle(`**${autor.displayName}'s Suggestion 🧠**`)
      .setThumbnail(message.guild.iconURL())
      .setDescription(`${text}`)
      .setColor(kyoColor)
      .addField("**Usuario**", `${autor}`, true)
      .addField(
        `**Sugerencia - [${SERVER}]**`,
        `**Enviado desde ${message.channel}**`,
        true
      )
      .setFooter("Sugerencias de miembros del Servidor")
      .setTimestamp();
    const serverChannel = message.guild.channels.cache.find(
      (ch) => ch.name === "📯・suggestions"
    );
    if (!serverChannel) {
      return message.guild.channels
        .create("📯・suggestions", {
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
  }
};

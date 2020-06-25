//Importación especifica de Metodos - findUserID putEmoji Functions
const { putEmoji } = require("../../utils/misc/functions.js");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de Usuario
const { memberExist } = require("../../utils/database/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación de la Clase Padre y Conexión con la Base de Datos
const BaseCommand = require("../../../src/utils/structure/BaseCommand.js");
//Exportación del Comando Clear
module.exports = class ClearCommand extends BaseCommand {
  constructor() {
    super(
      "clear",
      ["cls", "limpiar"],
      "Comando para **eliminar** mensajes del Servidor.",
      "clear`\n**Opciones:** `<number>`",
      "_***Pilares - Inmortales - Moderadores***_",
      "mod"
    );
  }

  async run(bot, message, args) {
    //Eliminación del mensaje con Comandos
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    //Miembro existente
    const existMember = (
      await memberExist(message.guild.id, message.author.id)
    )[0];
    //Inicialización de Párametros Member
    const { moderatorMember } = existMember[0];
    //Insuficientes Permisos para usar el Comando
    if (moderatorMember === 0) return perm.moderatorPerms(bot, message);
    //Emoji from Map
    const emoji = synchronous.emojiID[0].afirmado;
    if (!args[0]) {
      message.channel.bulkDelete(10);
      if (message.guild.id === synchronous.guildID) {
        return message.channel
          .send(
            `${putEmoji(bot, emoji)} Se han destruido **10** mensajes.`
          )
          .then((msg) =>
            msg.delete({ timeout: 5000, reason: "It had to be done." })
          );
      } else {
        return message.channel
          .send(`✅ Se han destruido **10** mensajes.`)
          .then((msg) =>
            msg.delete({ timeout: 5000, reason: "It had to be done." })
          );
      }
    }
    if (isNaN(args[0]) === true) return err.noCorrectArguments(bot, message);
    message.channel.bulkDelete(args[0]).then(() => {
      if (message.guild.id === synchronous.guildID) {
        message.channel
          .send(
            `${putEmoji(bot, emoji)} Se han destruido ${
              args[0]
            } mensajes.`
          )
          .then((msg) =>
            msg.delete({ timeout: 5000, reason: "It had to be done." })
          );
      } else {
        message.channel
          .send(`✅ Se han destruido **${args[0]}** mensajes.`)
          .then((msg) =>
            msg.delete({ timeout: 5000, reason: "It had to be done." })
          );
      }
    });    
  }
};

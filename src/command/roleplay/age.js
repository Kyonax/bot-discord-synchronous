//Importación especifica de Metodos - RichEmbed - putEmoji - Errors - nonecolor Color - afirmado Emoji
const { MessageEmbed } = require("discord.js");
const { putEmoji } = require("../../utils/misc/functions");
const { noneColor } = require("../../../database/utils/color/color.json");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
const { updateGuildRolePlayAge } = require("../../utils/database/functions");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const StateManager = require("../../utils/database/StateManager");
//Exportación de Comando Age
module.exports = class AgeCommand extends BaseCommand {
  constructor() {
    super(
      "age",
      ["edad"],
      "Comando para colocar una **Edad en el DNI**.",
      "age <number>`",
      "Todos",
      "roleplay"
    );
  }

  async run(bot, message, args) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    if (!args[0]) return err.noAgeDigit(bot, message);
    //Validación es un Número o no
    if (isNaN(args[0]) === true) return err.noCorrectArgumentsAge(bot, message);
    //Inicialización de variable Edad
    const age = parseInt(args[0]);
    const updateMemberAge = await updateGuildRolePlayAge(
      message.guild.id,
      message.author.id,
      age
    );
    StateManager.emit(
      "updateMemberAge",
      message.guild.id,
      message.author.id,
      age
    );
    //Inicialización de Emojis y su Uso respectivo
    let emoji = putEmoji(bot, synchronous.emojiID[0].afirmado);
    if (message.guild.id != synchronous.guildID) emoji = "✅";
    //Embed de confirmación
    let embed = new MessageEmbed()
      .setAuthor(
        `${message.author.username}'s DNI`,
        message.author.displayAvatarURL()
      )
      .setDescription(`${emoji} Cambio de **Edad** exitoso.`)
      .setColor(noneColor);
    //Envio de mensaje Embed al canal para luego ser eliminado en 10seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 10000, reason: "It had to be done." });
    });
  }
};

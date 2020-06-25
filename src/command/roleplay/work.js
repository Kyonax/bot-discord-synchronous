//Importación especifica de Metodos - RichEmbed - putEmoji - Errors - nonecolor Color - afirmado Emoji
const { MessageEmbed } = require("discord.js");
const { putEmoji } = require("../../utils/misc/functions");
const { noneColor } = require("../../../database/utils/color/color.json");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
const { updateGuildRolePlayWork } = require("../../utils/database/functions");
const { addMessageToBin } = require("../../utils/misc/bin");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const StateManager = require("../../utils/database/StateManager");
//Exportación de Comando Age
module.exports = class WorkCommand extends BaseCommand {
  constructor() {
    super(
      "work",
      ["trabajar", "trabajo", "ocupacion"],
      "Comando para **Agregar** un **Trabajo** a la **DNI**.",
      "work <nameWork>`",
      "Todos",
      "roleplay"
    );
  }
  async run(bot, message, args) {
    addMessageToBin(bot, message);
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    //Inicialización de Variables - Usuario  || Validación - Usuario no permitido
    let member = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    if (member) return err.noCorrectArgumentsWork(bot, message);
    //Inicialización de Variables
    const work = args.slice(0).join(" ");
    const updateMemberWork = await updateGuildRolePlayWork(
      message.guild.id,
      message.author.id,
      work
    );
    StateManager.emit(
      "updateMemberWork",
      message.guild.id,
      message.author.id,
      work
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
      .setDescription(`${emoji} Cambio de **Trabajo** exitoso.`)
      .setColor(noneColor);
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 10000, reason: "It had to be done." });
    });
  }
};

//Importación especifica de Metodos - RichEmbed - putEmoji - Errors - nonecolor Color - afirmado Emoji
const { MessageEmbed } = require("discord.js");
const { putEmoji } = require("../../utils/misc/functions");
const { noneColor } = require("../../../database/utils/color/color.json");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
const { updateGuildRolePlayBio } = require("../../utils/database/functions");
const { addMessageToBin } = require("../../utils/misc/bin");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const StateManager = require("../../utils/database/StateManager");
//Exportación de Comando Biography
module.exports = class BiographyCommand extends BaseCommand {
  constructor() {
    super(
      "biography",
      ["biografia", "bio"],
      "Comando para colocar una **Biografía en el DNI**.",
      "biography <text>`",
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
    if (member) return err.noCorrectArgumentsBio(bot, message);
    //Inicialización - Biografía de Usuario para DNI
    const biography = args.slice(0).join(" ");
    //Cambio en Base de Datos
    const updateMemberAge = await updateGuildRolePlayBio(
      message.guild.id,
      message.author.id,
      biography
    );
    StateManager.emit(
      "updateMemberBio",
      message.guild.id,
      message.author.id,
      biography
    );
    //Inicialización de Emojis y su Uso respectivo
    let emoji = putEmoji(bot, synchronous.emojiID[0].afirmado);
    if (message.guild.id != synchronous.guildID) emoji = "✅";
    //Mensaje Embed para el Comando - Envío de Embed por el mismo Canal
    let embed = new MessageEmbed()
      .setAuthor(
        `${message.author.username}'s DNI`,
        message.author.displayAvatarURL()
      )
      .setDescription(`${emoji} Cambio de **Biografía** exitoso.`)
      .setColor(noneColor);
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 10000, reason: "It had to be done." });
    });
  }
};

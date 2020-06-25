//Importación especifica de Metodos - RichEmbed - getMember
const { MessageEmbed } = require("discord.js");
const { getMember } = require("../../utils/misc/functions");
const { loveColor } = require("../../../database/utils/color/color.json");
//Importación Clase de Objetos
const Error = require("../../../database/conectors/error");
//Importación de la Clase Padre
const BaseCommand = require("../../utils/structure/BaseCommand");
module.exports = class LoveCommand extends BaseCommand {
  constructor() {
    super(
      "love",
      ["amor", "lv"],
      "Comando para **Cuestionar** el amor de un **Miembro** del **Servidor**.",
      "love <user> `",
      "Todos",
      "member"
    );
  }
  async run(bot, message, args) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Inicialización de los Objetos
    const err = new Error();
    //Inicialización de Variable de Usuario
    let member = getMember(message, args[0]);
    //Validación de Usuario y Autor de Mensaje
    if (member.id === message.author.id)
      return err.noValidTargetLove(bot, message);
    const love = Math.random() * 100;
    const loveIndex = Math.floor(love / 10);
    const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);
    //Embed
    let embed = new MessageEmbed()
      .setColor(loveColor)
      .addField(
        `🔥 **${member.displayName}** ama a **${message.member.displayName}** con una pasión del:`,
        `💟 ${Math.floor(love)}%\n\n${loveLevel}`
      )
      .setThumbnail(member.user.displayAvatarURL());
    message.channel.send(embed);
  }
};

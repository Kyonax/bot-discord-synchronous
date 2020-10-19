//Importación especifica de Metodos - RichEmbed - Perms - cautioncolor Color
const { MessageEmbed } = require("discord.js");
const { noneColor } = require("../../../database/utils/color/color.json");
const { addMessageToBin } = require("../../utils/misc/bin");
//Importación Clase de Objetos - Conector Error - Perms
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
//Exportación del Comando news
module.exports = class NewsCommand extends BaseCommand {
  constructor() {
    super(
      "image",
      ["img", "imagen"],
      "Comando para **mandar** una **Imagen con el Bot**",
      "image <type>`",
      "***Owner***",
      "owner"
    );
  }

  async run(bot, message, args) {
    addMessageToBin(bot, message);
    //Eliminación del mensaje con Comandos
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const perm = new Perms();
    //Validación Permisos
    if (message.member.id != message.guild.ownerID)
      return perm.ownerPerms(bot, message);
    //Variables
    let embed = new MessageEmbed()
      .setColor(noneColor)
      .attachFiles([
        "database/multimedia/images/demo/server/CreatorContent.png",
      ]).setImage("attachment://CreatorContent.png");
    message.channel.send(embed);
  }
};

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
      "say",
      ["text", "decir", "says"],
      "Comando para **mandar** un **Mensaje con el Bot**",
      "say <title> ¬ <description>`",
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
    let autor = message.author;
    let contentArgs = "";
    let key = "¬";
    let tittle = "None";
    let description = "None";
    for (var i = 0; i < args.length; i++) {
      contentArgs = contentArgs + " " + args[i];
      if (args[i].toString() === key) {
        tittle = contentArgs;
        contentArgs = message.content;
        break;
      }
    }
    tittle = tittle.replace("¬", "");
    let REPLACE_STRINGS = ["s!text", "s!decir", "s!says","s!say","!say", "¬", tittle];
    for (var i = 0; i < REPLACE_STRINGS.length; i++) {
      contentArgs = contentArgs.replace(REPLACE_STRINGS[i], "");
    }
    description = contentArgs;
    const embed = new MessageEmbed()
      .setColor(noneColor)
      .setTitle(tittle)
      .setDescription(description)  
      .attachFiles([
        "database/multimedia/images/demo/server/GIF_KyonaxComfyFort_BannerBarServer.gif",
      ])
      .setImage("attachment://GIF_KyonaxComfyFort_BannerBarServer.gif");    
      
    message.channel.send(embed);
  }
};

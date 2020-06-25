//Importación especifica de Metodos - RichEmbed
const { MessageEmbed } = require("discord.js");
const { getMember } = require("../../utils/misc/functions");
const { noneColor } = require("../../../database/utils/color/color.json");
let { levelRoleRewards } = require("../../../database/conectors/rewards");
//Importación de la Clase Padre
const BaseCommand = require("../../utils/structure/BaseCommand");
//Exportación comando DO
module.exports = class DoCommand extends BaseCommand {
  constructor() {
    super(
      "do",
      ["hacer"],
      "Comando para **Rolear Entorno**.",
      "do <text>`",
      "Todos",
      "roleplay"
    );
  }

  async run(bot, message, args) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Recompensas de Niveles de Rol Usando comandos de Rol
    levelRoleRewards(message, bot);
    //Inicialización de Variables Autor - Inicio de Color de Do - Final de Color del Do
    // Mensaje para colocar en Do
    const autor = getMember(message, message.author.id);
    let startColor = "```fix\nDo" + `(${autor.displayName}): `;
    let endColor = ".```";
    const mssg = args.slice(0).join(" ");
    let content = startColor + mssg + endColor;
    let embed = new MessageEmbed().setColor(noneColor).setDescription(content);
    message.channel.send(embed);
  }
};

//Importación especifica de Metodos - MessageEmbed - nonecolor Color - readdirSync
const { MessageEmbed } = require("discord.js");
const { getMember } = require("../../utils/misc/functions");
const { pixxaColor } = require("../../../database/utils/color/color.json");
//JSON
const fs = require("fs");
let bin = require("../../../database/utils/adds/bin.json");
//Importación Clase de Objetos - Conector Error
const Error = require("../../../database/conectors/error");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
//Exportación del Comando Bin
module.exports = class BinCommand extends BaseCommand {
  constructor() {
    super(
      "bin",
      ["papelera", "basura", "garbage", "reciclaje"],
      "Comando para abrir la **Papelera de Reciclaje**.",
      "bin <options>`.\n**Opciones:** `<show>`,`<remove>`\n**Remove:** `<all>`,`<number>`",
      "_***Todos***_",
      "guild"
    );
  }

  async run(bot, message, args) {
    //Eliminación de mensaje que usó el Comando
    message.delete().catch((O_o) => {});
    const option = args[0];
    const autor = getMember(message, message.author.id);
    switch (option) {
      case "show":
        let messages = bin[message.guild.id].users[message.author.id].messages;
        let embedArray = [];
        let amountLines = 62;
        let numberElements = 0;
        let draw = "";
        messages.forEach((msg) => {
          let add = "";
          if (msg.length % 2 !== 0) add = "-";
          let times = Math.max((amountLines - msg.length) / 2);
          if (times < 0) times = 0;
          draw = "-".repeat(times);
          embedArray.push(
            +numberElements +
              "|[" +
              draw +
              "]|" +
              msg +
              "|[" +
              draw +
              add +
              "]|"
          );
          numberElements++;
        });
        let embed = new MessageEmbed()
          .setTitle(`${autor.displayName}'s Bin 🗃`)
          .setDescription(
            `Esta es tu **Papelera de Reciclaje** ${autor} para **eliminar elementos** de la papelera usa la opción ` +
              "`remove <number>`, siendo el número la **posición del Elemento**.\n\n\n" +
              `**Hay [${embedArray.length}] elementos en tu Papelera de Reciclaje**\n` +
              "```css\n" +
              embedArray.join("\n") +
              "```"
          )
          .setColor(pixxaColor);
        message.channel.send(embed);
        break;
      case "remove":
        break;
      default:
        break;
    }
    //Creación de Objetos
    const error = new Error();
  }
};

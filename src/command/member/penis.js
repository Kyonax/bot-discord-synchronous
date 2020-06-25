//Importación especifica de Metodos - putEmoji Function - synkoin Emoji
const { getMember, putEmoji } = require("../../utils/misc/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
//Exportación del Comando penis
module.exports = class PenisCommand extends BaseCommand {
  constructor() {
    super(
      "penis",
      ["dick", "pene"],
      "Comando para **ver** cuanto te mide el **Miembro**.",
      "penis`\n**Opciones de Admin:** `<user>`",
      "_***Todos***_",
      "member"
    );
  }

  async run(bot, message, args) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Inicialización de Variables - Pequeña Base de Datos de Respuestas - Random Repuestas - Usuario
    let replies = [
      "**8D**",
      "**8=D**",
      "**8==D**",
      "**8===D**",
      "**8====D**",
      "**8=====D**",
      "**8======D**",
      "**8=======D**",
      "**8========D**",
      "**8==========D**",
      "**8==========D**",
      "**8===========D**",
      "**8============D**",
      "**8=============D**",
      "**8==============D**",
      "**8===============D**",
      "**8================D**",
      "**8=================D**",
      "**8==================D**",
      "**8===================D**",
      "**8====================D**",
      "**8=====================D**",
      "**8======================D**",
      "**8=======================D**",
      "**8∞D**",
    ];
    let result = Math.floor(Math.random() * replies.length);
    let member = getMember(message, args[0]);
    const emoji = synchronous.emojiID[0].afirmado;
    //Validación cuando se escoje el 24 como respuesta - Envio de Mensaje al canal en el que se llamó
    if (message.guild.id === synchronous.guildID) {
      if (result === 24)
        return message.channel.send(
          `${putEmoji(bot, emoji)}El miembro de **${
            member.username
          }** es **infinito** ${replies[result]}`
        );
      message.channel.send(
        `${putEmoji(
          bot,
          emoji
        )} El miembro de **${member}** mide **${result}cm** ${replies[result]}`
      );
    } else {
      if (result === 24)
        return message.channel.send(
          `✅ El miembro de **${member}** es **infinito** ${replies[result]}`
        );
      message.channel.send(
        `✅ El miembro de **${member}** mide **${result}cm** ${replies[result]}`
      );
    }
  }
};

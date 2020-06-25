//Importación especifica de Metodos - findUserID putEmoji Functions
const { MessageEmbed } = require("discord.js");
const { putEmoji } = require("../../utils/misc/functions.js");
const { thrizzColor } = require("../../../database/utils/color/color.json");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación Clase de Objetos - Conector Error
const Error = require("../../../database/conectors/error");
//Importación de la Clase Padre y Conexión con la Base de Datos
const BaseCommand = require("../../../src/utils/structure/BaseCommand.js");
//Exportación del Comando 8Ball
module.exports = class BallCommand extends BaseCommand {
  constructor() {
    super(
      "8ball",
      ["8b", "ball", "bola8"],
      "Comando para **realizar** una pregunta a la **bola mágica**.",
      "8ball <question>`",
      "_***Todos***_",
      "miscellaneous"
    );
  }
  async run(bot, message, args) {
    //Creación de Objeto Error
    const err = new Error();
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Validación de Pregunta, Si Existe y la Longitud
    if (!args[1]) return err.shortQuestion(bot, message);
    //Inicialización de Variables - Array de Respuestas - Random de Respuesta Seleccionada - Pregunta Capturada
    let replies = [
      "**Sí.**",
      "**No.**",
      "**Bueh.**",
      "**Haber estudiado.**",
      "Suscríbete a **Synks** y te digo.",
      "**Necesito prepararme.** pregunta denuevo.",
      "**Algún día.**",
      "**¿No es obvio?.**",
      "**Por el Behind.**",
      "**Estás mamadísimo.**",
      "**Ahora estoy ocupado Crack.**",
      "**Ostras**, no tengo idea.",
      "**Sólo un poco.**",
      "**JAJAJAJAJAJAAJ**",
      "**Jumm, es mejor no decirlo.**",
      "**Ni en pedo.**",
      "**Dígale eso al Juez.**",
      "**Buenarrrdoo!!**",
      "**Never in the life.**",
      "**Eso le pasó a Lizy y palmó**.",
      "**Es verdah, es verdah, es verdah**.",
      "**Definitivamente**",
      "**Sin dudarlo**",
    ];
    let result = Math.floor(Math.random() * replies.length);
    let question = args.slice(0).join(" ");
    let autor = message.author;
    const emoji = synchronous.emojiID[0].eightball;
    //Mensaje Embed del 8ball
    let embed = new MessageEmbed()
      .setThumbnail(autor.displayAvatarURL())
      .setColor(thrizzColor)
      .addField(`⁉ **Pregunta Realizada** por **${autor.username}**`, question)
      .setFooter("Todas las respuestas son 100% real no feik")
      .setTimestamp();
    //Separación guild Por Emojis
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `${putEmoji(bot, emoji)} ` + "**Respuesta**",
        replies[result]
      );
    } else {
      embed.addField(`🎱` + " **Respuesta**", replies[result]);
    }
    //Envio de mensajes al canal usado y eliminación de mensaje con el Comando
    message.channel.send(embed);    
  }
};


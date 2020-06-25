//Importación especifica de Metodos - MessageEmbed - nonecolor Color - putEmoji Function
const { MessageEmbed } = require("discord.js");
const { noneColor } = require("../../../database/utils/color/color.json");
const { putEmoji } = require("../../utils/misc/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
//Exportación del Comando Uptime
module.exports = class PingCommand extends BaseCommand {
  constructor() {
    super(
      "ping",
      ["p", "latencia", "latency", "ms"],
      "Comando para **ver tu Ping** con respecto al Servidor.",
      "ping`.",
      "_***Todos***_",
      "guild"
    );
  }

  async run(bot, message) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Mensaje Embed
    let embed = new MessageEmbed().setColor(noneColor);
    //Emoji from Map
    let msg = null;
    const emoji = synchronous.emojiID[0].afirmado;
    if (message.guild.id === synchronous.guildID) {
      msg = await message.channel.send(
        `${putEmoji(bot, emoji)} Calculando...`
      );
      embed.setTitle(`${putEmoji(bot, emoji)} Pong`);
    } else {
      msg = await message.channel.send(`✅ Calculando...`);
      embed.setTitle(`✅ Pong`);
    }
    var userLatency = Math.floor(msg.createdAt - message.createdAt);
    var apiLatency = Math.round(bot.ws.ping);
    let normalLatency = ":green_square:";
    let mediumLatency = ":yellow_square:";
    let highLatency = ":red_square:";
    let emojiLatency = "none";
    let apiEmoji = "none";

    if (userLatency <= 200) {
      emojiLatency = normalLatency;
    } else if (userLatency > 200 && userLatency < 400) {
      emojiLatency = mediumLatency;
    } else {
      emojiLatency = highLatency;
    }

    if (apiLatency <= 200) {
      apiEmoji = normalLatency;
    } else if (apiLatency > 200 && apiLatency < 400) {
      apiEmoji = mediumLatency;
    } else {
      apiEmoji = highLatency;
    }

    embed.addField(
      "**LATENCIA DE USUARIO:**",
      `${emojiLatency} ${userLatency}ms.`
    );
    embed.addField("**LATENCIA DE LA API:**", `${apiEmoji} ${apiLatency}ms.`);

    msg.edit(embed).then((msg) => {
      msg.delete({ timeout: 10000, reason: "It had to be done." });
    });
  }
};

//Importación especifica de Metodos - MessageEmbed - nonecolor Color - putEmoji Function
const { MessageEmbed } = require("discord.js");
const { noneColor } = require("../../../database/utils/color/color.json");
const { putEmoji } = require("../../utils/misc/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
//Exportación del Comando Uptime
module.exports = class UptimeCommand extends BaseCommand {
  constructor() {
    super(
      "uptime",
      ["up", "onbot"],
      "Comando para **ver cuanto tiempo** ha estado conectado el **Bot**.",
      "uptime`",
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
      embed.setTitle(`${putEmoji(bot, emoji)} Uptime`);
    } else {
      msg = await message.channel.send(`✅ Calculando...`);
      embed.setTitle(`✅ Uptime`);
    }
    function duration(ms) {
      const sec = Math.floor((ms / 1000) % 60).toString();
      const min = Math.floor((ms / (1000 * 60)) % 60).toString();
      const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
      const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
      return `${days.padStart(1, "0")} días / ${hrs.padStart(
        2,
        "0"
      )} horas / ${min.padStart(2, "0")} minutos / ${sec.padStart(
        2,
        "0"
      )} segundos.`;
    }
    //Iserción de la información de la Duración activa del Bot
    embed.addField(
      "**EL BOT HA SIDO INICIADO DESDE:**",
      `${duration(bot.uptime)}.`
    );

    msg.edit(embed).then((msg) => {
      msg.delete({ timeout: 10000, reason: "It had to be done." });
    });
  }
};

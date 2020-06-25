//Importación especifica de Metodos - RichEmbed - stripIndents -Errors
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
//Importación Clase de Objetos - Conector Error
const Error = require("../../../database/conectors/error");
//Importación de la Clase Padre
const BaseCommand = require("../../utils/structure/BaseCommand");
//Importación de paquetes JS de Node.js
require("dotenv").config();
//Keys
const Client = require("fortnite");
const ft = new Client(process.env.TRACKER);
module.exports = class ForniteCommand extends BaseCommand {
  constructor() {
    super(
      "fortnite",
      ["fornite,fort"],
      "Comando para **Ver las Estadísticas** de un Jugador de **Fortnite**.",
      "fortnite <username_fortnite>`",
      "_***Todos***_",
      "games"
    );
  }
  async run(bot, message, args) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    //Validación No se ha digitado el Usuario
    if (!args[0]) {
      return err.noUserDigitF(bot, message);
    }
    //Inicialización de Variables
    const platforms = ["pc", "xb1", "psn"];
    const lastWord = args[args.length - 1].toLowerCase();
    let platform, username;
    //Validación de Plataforma
    if (platforms.includes(lastWord)) {
      username = args.slice(0, args.length - 1).join(" ");
      platform = lastWord;
    } else {
      username = args.join(" ");
      platform = "pc";
    }
    //Tracker
    const search = await ft.user(username, platform);
    //Usuario No encontrado
    if (!search.username) return err.noUserFound(bot, message);
    //Inicialización de Variables de Stats
    const lifetime = search.stats.lifetime;
    const solo = search.stats.solo;
    const duo = search.stats.duo;
    const squad = search.stats.squad;
    //Embed
    let embed = new MessageEmbed()
      .setColor("#9d4dbb")
      .setTitle(
        `Estadísticas de ${search.username} en **Fortnite** ${search.platform} `
      )
      .setURL(search.url)
      .setThumbnail(
        "https://i.pinimg.com/originals/72/54/44/725444874a4c0bda8ea17fd6f6332c11.jpg"
      )
      .setFooter(`Tracker Fortnite`, message.author.displayAvatarURL)
      .setTimestamp();
    //Validaciones en Embed
    if (!solo) {
      embed.addField(
        "Partidas en **Solo**: ",
        `**${search.username}** no ha **Jugado** en este modo.`,
        false
      );
    } else {
      embed.addField(
        "Partidas en **Solo**: " + solo.matches,
        stripIndents`**🏅 Wins:** ${solo.wins}
    **🧠 KD:** ${solo.kd}
    **🩸 Kills:** ${solo.kills}
    **⚔ Kills Partida:** ${solo.kills_per_match}`,
        true
      );
    }
    if (!duo) {
      embed.addField(
        "Partidas en **Duo**: ",
        `**${search.username}** no ha **Jugado** en este modo.`,
        false
      );
    } else {
      embed.addField(
        "Partidas en **Duo**: " + duo.matches,
        stripIndents`**🏅 Wins:** ${duo.wins}
    **🧠 KD:** ${duo.kd}
    **🩸 Kills:** ${duo.kills}
    **⚔ Kills Partida:** ${duo.kills_per_match}`,
        true
      );
    }
    embed.addField("\u200b", "\u200b");
    if (!squad) {
      embed.addField(
        "Partidas en **Squad**: ",
        `**${search.username}** no ha **Jugado** en este modo.`,
        false
      );
    } else {
      embed
        .addField(
          "Partidas en **Squad**: " + squad.matches,
          stripIndents`**🏅 Wins:** ${squad.wins}
    **🧠 KD:** ${squad.kd}
    **🩸 Kills:** ${squad.kills}
    **⚔ Kills Partida:** ${squad.kills_per_match}`,
          true
        )

        .addField(
          "Estadísticas Totales:",
          stripIndents`**🛡 Matches:** ${lifetime.matches}
    **🏅 Wins:** ${lifetime.wins}
    **🧠 KD:** ${lifetime.kd}
    **🩸 Kills:** ${lifetime.kills}`,
          true
        );
    }
    //Envio por el Canal
    message.channel.send(embed);
  }
};

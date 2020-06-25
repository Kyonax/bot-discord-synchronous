//Importación especifica de Metodos - RichEmbed - stripIndents -Errors
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { pixxaColor } = require("../../../database/utils/color/color.json");
//Importación Clase de Objetos - Conector Error
const Error = require("../../../database/conectors/error");
//Importación de la Clase Padre
const BaseCommand = require("../../utils/structure/BaseCommand");
//Importación de paquetes JS de Node.js
const API = require("apex-api");
require("dotenv").config();
//Key Tracker Apex
const apex = new API(process.env.TRACKER);
module.exports = class ApexCommand extends BaseCommand {
  constructor() {
    super(
      "apex",
      ["apx"],
      "Comando para **Ver las Estadísticas** de un Jugador de **Apex Legends**.",
      "apex <platform> <username_apex>`\n**Plataformas:** `<pc>`,`<xbox>`,`<psn>`",
      "_***Todos***_",
      "games"
    );
  }

  async run(bot, message, args) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    let err = new Error();
    //Validaciones
    if (!args[0])
      return err.noPlatformDigit(bot, message).catch((err) => console.log(err));
    if (!args[1]) {
      const noPlatforms =
        args[0].toLowerCase() != "pc" ||
        args[0].toLowerCase() != "xbox" ||
        args[0].toLowerCase() != "psn";
      if (noPlatforms) return err.wrongPlatform(bot, message);
      return err.noUserDigit(bot, message);
    }
    const platformCheck = args[0].toUpperCase();
    const user = args.slice(1).join(" ");
    apex.user(user, platformCheck ? platformCheck : PC).then((data) => {
      try {
        const userInfo = data.data.metadata;
        const stats = data.data.stats;
        const legend = data.data.children;
        const embed = new MessageEmbed()
          .setColor(pixxaColor)
          .setAuthor(
            `Apex Legends Tracker | ${userInfo.platformUserHandle}'s stats`,
            userInfo.avatarUrl
          )
          .setDescription(
            stripIndents`**País:** :flag_${
              userInfo.countryCode
                ? userInfo.countryCode.toLowerCase()
                : "white"
            }:
          **Usuario:** ${userInfo.platformUserHandle}        
          **Nombre de Rango:** ${userInfo.rankName}\n`
          )
          .setThumbnail(userInfo.rankImage);
        let lEmbed = new MessageEmbed()
          .setColor(pixxaColor)
          .setAuthor(
            `Apex Legends Tracker | ${userInfo.platformUserHandle}'s legend`,
            userInfo.avatarUrl
          )
          .setDescription(
            stripIndents`**Leyenda más usada:** ${legend[0].metadata.legend_name}`
          )
          .setImage(legend[0].metadata.bgimage)
          .setThumbnail(legend[0].metadata.icon);
        stats.forEach((sts) => {
          const title = sts.metadata.name;
          const value = sts.displayValue;
          const rank = sts.displayRank;
          const percentile = sts.percentile;
          try {
            embed.addField(
              `**${title.toUpperCase()}**`,
              stripIndents`**${value || 0}**
              *#${rank || 0} • Top ${percentile || 0}%*`,
              true
            );
          } catch (e) {
            console.log(e);
          }
        });
        legend[0].stats.forEach((sts) => {
          const title = sts.metadata.name;
          const value = sts.displayValue;
          const rank = sts.displayRank;
          const percentile = sts.percentile;
          try {
            lEmbed.addField(
              `**${title.toUpperCase()}**`,
              stripIndents`**${value || 0}**
              *#${rank || 0} • Top ${percentile || 0}%*`,
              true
            );
          } catch (e) {
            console.log(e);
          }
        });
        message.channel.send(embed);
        message.channel.send(lEmbed);
      } catch (e) {
        err.noUserFound(bot, message);
      }
    });
  }
};

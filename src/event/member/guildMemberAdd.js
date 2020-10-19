//Importación especifica de Metodos
const {
  circleImage,
  resizeImage,
  downloadUser,
} = require("../../utils/magik/functions");
const { delay, putEmoji } = require("../../utils/misc/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
const { welcomeMessage } = require("../../utils/misc/welcome");
//Importación de paquetes JS de Node.js
var fs = require("fs"),
  gm = require("gm"),
  imageMagick = gm.subClass({
    imageMagick: true,
  });
//NewUserGif
const backgroundNewUser =
  "database/multimedia/gifs/messages/newUserBackground.gif";
//Funciones
async function edit(firstImage, secondImage, name, username) {
  circleImage(firstImage, username);
  delay(3000).then(function () {
    resizeImage(username);
  });
  delay(9000).then(function () {
    secondStep(secondImage, name, username);
  });
}
async function secondStep(inImage, name, username) {
  gm(backgroundNewUser)
    .fill("#ffffff")
    .font("Helvetica-Bold", 40)
    .drawText(6, 212, `${name}`, "North")
    .bitdepth(8)
    .colors(128)
    .quality(10)
    .dither(false)
    .filter("Point")
    .antialias(false)
    .draw([`image Over 47,55 0,0 ${inImage}`])
    .write(
      `database/multimedia/images/magik/exports/${username}.gif`,
      function (err) {
        if (err) console.log("Error!: " + err);
      }
    );
}
//Importación de cuerpo de Eventos e importación de Conexión Base de Datos
const BaseEvent = require("../../utils/structure/BaseEvent");
//Exportación del Evento guildMemberAdd
module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super("guildMemberAdd");
  }
  async run(bot, member) {
    welcomeMessage(bot, member);
    //Variables
    let numberOfMembers = 0;
    let auxNumberOfMembers = 0;
    //Selección y conexión Con DATOS de la Guild Correspondiente
    bot.guilds.cache.forEach((guild) => {
      //Numero de Miembros Totales
      auxNumberOfMembers = numberOfMembers;
      numberOfMembers = auxNumberOfMembers + guild.members.cache.size;
      //Tracker Members
      const serverChannel = guild.channels.cache.find((ch) =>
        ch.name.includes("🌌-welcome")
      );
      if (!serverChannel) return;
    });

    member.roles.add("696113185945550988");
    const channel = member.guild.channels.cache.find(
      (ch) => ch.id === "697138993615339580"
    );
    const memberImage = member.user.displayAvatarURL({
      format: "png",
      dynamic: true,
      size: 1024,
    });
    if (!channel) return;
    //Inicialización de Emojis y su Uso respectivo
    let kyonax = putEmoji(bot, synchronous.emojiID[0].kyonax);
    if (member.guild.id != synchronous.guildID) kyonax = "🏮";
    let clever = putEmoji(bot, synchronous.emojiID[0].clever);
    if (member.guild.id != synchronous.guildID) clever = "⚔";
    let thrizz = putEmoji(bot, synchronous.emojiID[0].thrizz);
    if (member.guild.id != synchronous.guildID) clever = "☔";
    let pixxa = putEmoji(bot, synchronous.emojiID[0].pixxa);
    if (member.guild.id != synchronous.guildID) pixxa = "☠";
    downloadUser(memberImage, member.user.id).then(() => {
      delay(1000).then(async function () {
        edit(
          `../../../../database/multimedia/images/users/avatar/${member.user.id}.png`,
          `database/multimedia/images/users/circleAvatar/${member.user.id}CircleImageR.png`,
          member.user.tag,
          member.user.id
        );
      });
      return delay(18000).then(async function () {
        channel.send(
          `Hey ${member}, ahora eres parte del **Olimpo** 🎉🤗 !` +
            "**Los Pilares** te dan la bienvenida" +
            ` ${kyonax} ${clever} ${thrizz} ${pixxa}!`,
          {
            files: [
              `database/multimedia/images/magik/exports/${member.user.id}.gif`,
            ],
          }
        );
      });
    });
  }
};

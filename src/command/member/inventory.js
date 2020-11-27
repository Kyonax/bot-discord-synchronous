//Importación especifica de Metodos - getMember delay downloadUser circleImage findUserID putEmoji - RichEmbed - synksPerms - nonecolor Colors - levelup Emojis
const {
  getMember,
  delay,
  putEmoji,
  initObjectMember,
  numberWithCommas,
} = require("../../utils/misc/functions");
const { circleImage, downloadUser } = require("../../utils/magik/functions");
const { MessageEmbed } = require("discord.js");
const { limit } = require("../../utils/logic/logicMember");
const { noneColor } = require("../../../database/utils/color/color.json");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const StateManager = require("../../utils/database/StateManager");
//Mapa de Miembros
const guildMembers = new Map();
const guilds = new Map();
//Inicialización de js de Node.js
PNG = require("pngjs").PNG;
var fs = require("fs"),
  gm = require("gm"),
  imageMagick = gm.subClass({
    imageMagick: true,
  });
//Rutas de las imagenes
let barPercnt = "Bar0.png";
let background = `database/multimedia/images/barLevel/${barPercnt}`;
//Metodo de Edicion
async function edit(
  firstImage,
  secondImage,
  xp,
  level,
  lastxp,
  name,
  userColor,
  rank,
  nickname
) {
  circleImage(firstImage, name);
  delay(1200).then(function () {
    secondStep(background, xp, level, lastxp, name, userColor, rank, nickname);
  });
  delay(3000).then(function () {
    thirdStep(secondImage, name);
  });
}
async function thirdStep(inImage, name) {
  imageMagick(
    `database/multimedia/images/magik/exports/background${name}Text.png`
  )
    .resize(1000, 300)
    .composite(inImage)
    .in("-compose", "Over")
    .in("-geometry", "200x200+43+50")
    .write(
      `database/multimedia/images/magik/exports/bar${name}Level.png`,
      function (err) {
        if (err) console.log("Error!: " + err);
      }
    );
}
async function secondStep(
  inImage,
  xp,
  level,
  lastxp,
  name,
  userColor,
  rank,
  nickname
) {
  let sizeXP = 120;
  if (xp.length > 8) {
    sizeXP = 110;
  }
  gm(inImage)
    .gravity("Center")
    .fill(userColor)
    .fontSize(180)
    .drawText(-500 + nickname.length * 10 * 2, 450, `${nickname + ""}`, "North")
    .fill(userColor)
    .font("Helvetica-Bold", 160)
    .drawText(1400, 450, `Nivel: ${level}`, "North")
    .fill(userColor)
    .fontSize(sizeXP)
    .drawText(800, 1010, `${xp}xp / `, "North")
    .fill("#212327")
    .fontSize(sizeXP)
    .drawText(1100 + lastxp.length * 12 * 4, 1010, `${lastxp}xp`, "North")
    .fill("#212327")
    .fontSize(120)
    .drawText(-500, 1010, `Rank: #${rank}`, "North")
    .write(
      `database/multimedia/images/magik/exports/background${name}Text.png`,
      function (err) {
        if (err) console.log("Error!: " + err);
      }
    );
}
module.exports = class InventaryCommand extends BaseCommand {
  constructor() {
    super(
      "inventory",
      ["lvl", "nivel", "level", "inventario", "xp"],
      "Comando para **abrir** tu **inventario**.",
      "inventary`\n**Opciones:** `<user>`",
      "***Todos***",
      "member"
    );
  }
  async run(bot, message, args) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Inicialización de Variable de Usuario
    const member = getMember(message, args.join(" "));
    //Validación si en el Mensaje se usó un Usuario
    let memberImage = member.user.displayAvatarURL({
      format: "png",
      dynamic: true,
      size: 1024,
    });
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    let ObjectMember = null;
    let ObjectAutor = null;
    ObjectAutor = initObjectMember(
      guilds,
      ObjectAutor,
      message.guild.id,
      message.author.id
    );
    ObjectMember = initObjectMember(
      guilds,
      ObjectMember,
      message.guild.id,
      member.id
    );
    if (ObjectMember === null)
      return err.noFindMember(bot, message, member.displayName);
    const {
      memberXP,
      serverRank,
      memberLevel,
      memberBoost,
      warnings,
    } = ObjectMember;
    const { moderatorMember } = ObjectAutor;
    //Inicialización de Variables - Experiencia - Nivel - Boost
    let curxp = parseInt(memberXP);
    let currank = parseInt(serverRank);
    let curlevel = parseInt(memberLevel);
    let curbost = parseInt(memberBoost);
    let curwarnings = parseInt(warnings);
    let nxtLevel = limit(curxp, curlevel);
    //Validación de Permisos
    if (message.author.id != member.id) {
      if (moderatorMember !== 1) return perm.moderatorPerms(bot, message);
    }
    //BarLevel
    if (curxp <= nxtLevel * 0.05) {
      barPercnt = "Bar0.png";
      background = `database/multimedia/images/BarLevel/${barPercnt}`;
    } else if (curxp <= nxtLevel * 0.1 && curxp > nxtLevel * 0.05) {
      barPercnt = "Bar10.png";
      background = `database/multimedia/images/BarLevel/${barPercnt}`;
    } else if (curxp <= nxtLevel * 0.2 && curxp > nxtLevel * 0.1) {
      barPercnt = "Bar20.png";
      background = `database/multimedia/images/BarLevel/${barPercnt}`;
    } else if (curxp <= nxtLevel * 0.3 && curxp > nxtLevel * 0.2) {
      barPercnt = "Bar30.png";
      background = `database/multimedia/images/BarLevel/${barPercnt}`;
    } else if (curxp <= nxtLevel * 0.4 && curxp > nxtLevel * 0.3) {
      barPercnt = "Bar40.png";
      background = `database/multimedia/images/BarLevel/${barPercnt}`;
    } else if (curxp <= nxtLevel * 0.5 && curxp > nxtLevel * 0.4) {
      barPercnt = "Bar50.png";
      background = `database/multimedia/images/BarLevel/${barPercnt}`;
    } else if (curxp <= nxtLevel * 0.6 && curxp > nxtLevel * 0.5) {
      barPercnt = "Bar60.png";
      background = `database/multimedia/images/BarLevel/${barPercnt}`;
    } else if (curxp <= nxtLevel * 0.7 && curxp > nxtLevel * 0.6) {
      barPercnt = "Bar70.png";
      background = `database/multimedia/images/BarLevel/${barPercnt}`;
    } else if (curxp <= nxtLevel * 0.8 && curxp > nxtLevel * 0.7) {
      barPercnt = "Bar80.png";
      background = `database/multimedia/images/BarLevel/${barPercnt}`;
    } else if (curxp <= nxtLevel * 0.9 && curxp > nxtLevel * 0.8) {
      barPercnt = "Bar90.png";
      background = `database/multimedia/images/BarLevel/${barPercnt}`;
    } else if (curxp > nxtLevel * 0.9) {
      barPercnt = "Bar100.png";
      background = `database/multimedia/images/BarLevel/${barPercnt}`;
    }
    //Emoji
    //Inicialización de Emojis y su Uso respectivo
    let emojiLevelUp = putEmoji(bot, synchronous.emojiID[0].levelup);
    let emojiWarning = putEmoji(bot, synchronous.emojiID[0].warning)
    let emojiBoost = null;
    const boostTime = parseInt(ObjectMember.memberBoost);
    if (boostTime === 1) {
      emojiBoost = "";
    }
    if (boostTime === 10) {
      emojiBoost = putEmoji(bot, synchronous.emojiID[0].boostb);
    }
    if (boostTime === 50) {
      emojiBoost = putEmoji(bot, synchronous.emojiID[0].boosta);
    }
    if (boostTime === 100) {
      emojiBoost = putEmoji(bot, synchronous.emojiID[0].boostp);
    }

    //Mensaje para el Embed de Usuario para este Comando
    let embed = new MessageEmbed()
      .setTitle(`**${member.displayName}'s Inventory**`)
      .setThumbnail("https://i.imgur.com/mylTtoH.png")
      .addField("**Usuario**", `**[${member.displayName}]**`, true)
      .addField("**Nivel**", `**${curlevel}** ${emojiLevelUp}`, true)
      .addField("**XP**", `**${numberWithCommas(curxp)}XP**`, true)
      .addField("**Rank**", `**#${currank}** ⚡`, true)
      .addField("**Warnings**", `**${curwarnings}** ${emojiWarning}`, true)
      .addField(
        "**Boosts de Nivel**",
        `**XP x ${curbost}** ${emojiBoost}`,
        true
      )
      .attachFiles([
        `./database/multimedia/images/magik/exports/bar${message.author.id}Level.png`,
      ])
      .setImage(`attachment://bar${message.author.id}Level.png`)
      .setColor(noneColor)
      .setFooter("Gestor de Niveles internacional de Synchronous")
      .setTimestamp();
    //Método de Descarga de Imágen
    downloadUser(memberImage, message.author.id).then(() => {
      delay(1000).then(async function () {
        edit(
          `../../database/multimedia/images/users/avatar/${message.author.id}.png`,
          `database/multimedia/images/users/circleAvatar/${message.author.id}CircleImage.png`,
          numberWithCommas(curxp) + "",
          curlevel,
          numberWithCommas(nxtLevel) + "",
          message.author.id,
          member.displayHexColor,
          currank + "",
          member.displayName
        );
      });
      return delay(6000).then(async function () {
        message.channel.send(embed).then((msg) => {
          msg.delete({ timeout: 60000, reason: "It had to be done." });
        });
      });
    });
  }
};

StateManager.on(
  "membersFetched",
  (
    membersGuild,
    guildID,
    memberID,
    memberLanguage,
    adminMember,
    inmortalMember,
    moderatorMember,
    serverRank,
    memberXP,
    memberLevel,
    memberBoost,
    boostMemberTime,
    warnings
  ) => {
    guildMembers.set(memberID, {
      memberID: memberID,
      guildID: guildID,
      memberLanguage: memberLanguage,
      adminMember: adminMember,
      inmortalMember: inmortalMember,
      moderatorMember: moderatorMember,
      serverRank: serverRank,
      memberXP: memberXP,
      memberLevel: memberLevel,
      memberBoost: memberBoost,
      boostMemberTime: boostMemberTime,
      warnings: warnings,
    });
    guilds.set(guildID, {
      Member: membersGuild,
    });
  }
);

StateManager.on(
  "membersUpdate",
  (
    membersGuild,
    guildID,
    memberID,
    memberLanguage,
    adminMember,
    inmortalMember,
    moderatorMember,
    serverRank,
    memberXP,
    memberLevel,
    memberBoost,
    boostMemberTime,
    warnings
  ) => {
    guildMembers.set(memberID, {
      memberID: memberID,
      guildID: guildID,
      memberLanguage: memberLanguage,
      adminMember: adminMember,
      inmortalMember: inmortalMember,
      moderatorMember: moderatorMember,
      serverRank: serverRank,
      memberXP: memberXP,
      memberLevel: memberLevel,
      memberBoost: memberBoost,
      boostMemberTime: boostMemberTime,
      warnings: warnings,
    });
    guilds.set(guildID, {
      Member: membersGuild,
    });
  }
);

StateManager.on(
  "updateBoostMemberTime",
  (guildID, memberID, memberBoost, boostMemberTime) => {
    let ObjectMember = null;
    ObjectMember = initObjectMember(guilds, ObjectMember, guildID, memberID);
    ObjectMember.memberBoost = memberBoost;
    ObjectMember.boostMemberTime = boostMemberTime;
  }
);

StateManager.on(
  "updateMemberBoost",
  (guildID, memberID, memberBoost, boostMemberTime) => {
    let ObjectMember = null;
    ObjectMember = initObjectMember(guilds, ObjectMember, guildID, memberID);
    ObjectMember.memberBoost = memberBoost;
    ObjectMember.boostMemberTime = boostMemberTime;
  }
);

StateManager.on(
  "updateModeratorMember",
  (guildID, memberID, moderatorMember) => {
    let ObjectMember = null;
    ObjectMember = initObjectMember(guilds, ObjectMember, guildID, memberID);
    ObjectMember.moderatorMember = moderatorMember;
  }
);

StateManager.on("updateWarnings", (guildID, memberID, warnings) => {
  let ObjectMember = null;
  ObjectMember = initObjectMember(guilds, ObjectMember, guildID, memberID);
  ObjectMember.warnings = warnings;
});

StateManager.on(
  "updateMemberLevel",
  (guildID, memberID, memberLevel, memberXP) => {
    let ObjectMember = null;
    ObjectMember = initObjectMember(guilds, ObjectMember, guildID, memberID);
    ObjectMember.memberLevel = memberLevel;
    ObjectMember.memberXP = memberXP;
  }
);

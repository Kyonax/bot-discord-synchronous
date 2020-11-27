//Importación especifica de Metodos - RichEmbed - getMember formatDate findUserID putEmoji Functions - Errors - levelup Emoji - nonecolor Color
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const {
  numberWithCommas,
  getMember,
  formatDate,
  putEmoji,
  initObjectMember,
} = require("../../utils/misc/functions");
let { levelRoleRewards } = require("../../../database/conectors/rewards");
const { limit } = require("../../utils/logic/logicMember");
//Importación de Archivos JS creados por Kyonax
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
const { noneColor } = require("../../../database/utils/color/color.json");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const StateManager = require("../../utils/database/StateManager");
//Mapas
const rolePlayMembers = new Map();
const guildsRoleplay = new Map();
//Mapa de Miembros
const guildMembers = new Map();
const guilds = new Map();
//Exportación de Comando DNI
module.exports = class DniCommands extends BaseCommand {
  constructor() {
    super(
      "dni",
      ["ti", "cc"],
      "Comando para **Mostrar** la DNI del Servidor.",
      "dni`\n**Opciones** `<user>`",
      "Todos",
      "roleplay"
    );
  }
  async run(bot, message, args) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    //Inicialización de Variables Autor - Usuario - Ingreso al Servidor - Role - Length Array - Id de Usuario
    let autor = message.author;
    const member = getMember(message, args.join(" "));
    const joined = formatDate(member.joinedAt);
    const role =
      member.roles.cache
        .filter((r) => r.id !== message.guild.id)
        .map((r) => r)
        .join(", ") || "none";
    //Uso de funciones en las variables necesitadas
    let ObjectAuthor = null;
    let ObjectMember = null;
    ObjectMember = initObjectMember(
      guildsRoleplay,
      ObjectMember,
      message.guild.id,
      member.id
    );
    ObjectAuthor = initObjectMember(
      guilds,
      ObjectAuthor,
      message.guild.id,
      autor.id
    );
    if (ObjectMember === null)
      return err.noFindMember(bot, message, member.displayName);
    const { moderatorMember } = ObjectAuthor;
    const {
      memberXP,
      memberLevel,
      memberBiography,
      rolePlayRank,
      memberAge,
      memberRespect,
      memberWork,
      memberRelation,
    } = ObjectMember;
    //Inicialización de Variables Limite y gráfico de Siguiente Nivel
    let nxtLevel = limit(parseFloat(memberXP), parseFloat(memberLevel));
    const nextLevelIndex = (parseFloat(memberXP) * 10) / nxtLevel;
    const actionLevel =
      "🟦".repeat(nextLevelIndex * 2) + "⬜".repeat((10 - nextLevelIndex) * 2);
    //Inicialización de Emojis y su Uso respectivo
    let emoji = putEmoji(bot, synchronous.emojiID[0].levelup);    
    //Embed
    let embed = new MessageEmbed()
      .setAuthor(`${member.displayName}'s DNI`, member.user.displayAvatarURL())
      .setDescription(
        `${memberBiography}.\n\nLlegando a la **${message.guild.name}** el día ${joined}`
      )
      .setThumbnail(member.user.displayAvatarURL())
      .addField(`${emoji} Nivel de Rol`, `${memberLevel}`, true)
      .addField(``+putEmoji(bot, "780487068237037568")+` Rank`, `#${rolePlayRank}`, true)
      .addField(`⌛ Edad`, `${memberAge} años.`, true)
      .addField(`☄ Renombre`, `${memberRespect}`, true)
      .addField(`💼 Trabajo`, `${memberWork}.`, true)
      .addField(`💍 Casada/o con`, `${memberRelation}.`, true)
      .setColor(noneColor);
    if (ObjectMember.gameRolePlay) {
      embed.addField(
        "**Miembro Roleplay en**",
        `**> Juegos:**` + "\n`" + ObjectMember.gameRolePlay + "`"
      );
    }
    embed.addField(
      `Experiencia de Rol ${numberWithCommas(memberXP)} / ${numberWithCommas(
        nxtLevel
      )}`,
      `${actionLevel}`
    );
    //Validación de Variables - Permisos de Comandos - Falta de Usuario - Falta de Razón - Auto Baneo
    // - Usuarios Restringidos - Canal Existente
    if (moderatorMember === 0) {
      if (member.id !== autor.id) return perm.moderatorPerms(bot, message);
      return message.channel.send(embed).then((msg) => {
        msg.delete({ timeout: 60000, reason: "It had to be done." });
      });
    } else {
      message.channel.send(embed).then((msg) => {
        msg.delete({ timeout: 60000, reason: "It had to be done." });
      });
    }
  }
};

StateManager.on(
  "membersRolePlayFetched",
  (
    membersGuild,
    guildID,
    memberID,
    gameRolePlay,
    rolePlayRank,
    memberXP,
    memberLevel,
    memberAge,
    memberRespect,
    memberWork,
    memberRelation,
    memberBiography
  ) => {
    rolePlayMembers.set(memberID, {
      memberID: memberID,
      guildID: guildID,
      gameRolePlay: gameRolePlay,
      rolePlayRank: rolePlayRank,
      memberXP: memberXP,
      memberLevel: memberLevel,
      memberAge: memberAge,
      memberRespect: memberRespect,
      memberWork: memberWork,
      memberRelation: memberRelation,
      memberBiography: memberBiography,
    });
    guildsRoleplay.set(guildID, {
      Member: membersGuild,
    });
  }
);

StateManager.on(
  "membersRolePlayUpdate",
  (
    membersGuild,
    guildID,
    memberID,
    gameRolePlay,
    rolePlayRank,
    memberXP,
    memberLevel,
    memberAge,
    memberRespect,
    memberWork,
    memberRelation,
    memberBiography
  ) => {
    rolePlayMembers.set(memberID, {
      memberID: memberID,
      guildID: guildID,
      gameRolePlay: gameRolePlay,
      rolePlayRank: rolePlayRank,
      memberXP: memberXP,
      memberLevel: memberLevel,
      memberAge: memberAge,
      memberRespect: memberRespect,
      memberWork: memberWork,
      memberRelation: memberRelation,
      memberBiography: memberBiography,
    });
    guildsRoleplay.set(guildID, {
      Member: membersGuild,
    });
  }
);

StateManager.on("updateRolePlayRank", (guildID, memberID, serverRank) => {
  let ObjectMember = null;
  ObjectMember = initObjectMember(
    guildsRoleplay,
    ObjectMember,
    guildID,
    memberID
  );
  ObjectMember.rolePlayRank = serverRank;
});

StateManager.on(
  "updateRolePlayMemberXP",
  (guildID, memberID, updateXP, newLevel) => {
    let ObjectMember = null;
    ObjectMember = initObjectMember(
      guildsRoleplay,
      ObjectMember,
      guildID,
      memberID
    );
    ObjectMember.memberXP = updateXP;
    ObjectMember.memberLevel = newLevel;
  }
);

StateManager.on("updateMemberAge", (guildID, memberID, memberAge) => {
  let ObjectMember = null;
  ObjectMember = initObjectMember(
    guildsRoleplay,
    ObjectMember,
    guildID,
    memberID
  );
  ObjectMember.memberAge = memberAge;
});

StateManager.on("updateMemberBio", (guildID, memberID, memberBiography) => {
  let ObjectMember = null;
  ObjectMember = initObjectMember(
    guildsRoleplay,
    ObjectMember,
    guildID,
    memberID
  );
  ObjectMember.memberBiography = memberBiography;
});

StateManager.on("updateMemberRespect", (guildID, memberID, memberRespect) => {
  let ObjectMember = null;
  ObjectMember = initObjectMember(
    guildsRoleplay,
    ObjectMember,
    guildID,
    memberID
  );
  ObjectMember.memberRespect = memberRespect;
});

StateManager.on("updateMemberWork", (guildID, memberID, memberWork) => {
  let ObjectMember = null;
  ObjectMember = initObjectMember(
    guildsRoleplay,
    ObjectMember,
    guildID,
    memberID
  );
  ObjectMember.memberWork = memberWork;
});

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
  "updateModeratorMember",
  (guildID, memberID, moderatorMember) => {
    let ObjectMember = null;
    ObjectMember = initObjectMember(guilds, ObjectMember, guildID, memberID);
    ObjectMember.moderatorMember = moderatorMember;
  }
);

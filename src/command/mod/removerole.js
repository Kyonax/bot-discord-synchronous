//Importación especifica de Metodos - RichEmbed - getMember putEmoji replaceRolItems findUserID Functions - Errors - Perms - firehomecolor Colors - rol Emoji
const { MessageEmbed } = require("discord.js");
const {
  putEmoji,
  replaceRoleItems,
  initObjectMember,
} = require("../../utils/misc/functions");
const {
  updateGuildInmortalMember,
  updateGuildModeratorMember,
} = require("../../utils/database/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
const { addMessageToBin } = require("../../utils/misc/bin");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const StateManager = require("../../utils/database/StateManager");
//Mapa de Miembros
const guildMembers = new Map();
const guilds = new Map();
//Exportación de Comando Removerole
module.exports = class RemoveRoleCommand extends BaseCommand {
  constructor() {
    super(
      "removerole",
      ["rr", "roleremove", "quitarrol", "delegar"],
      "Comando para quitar **roles** a un **miembro** del Servidor.",
      "removerole <user> <@rol>`",
      "***Pilares - Inmortales - Moderadores***",
      "mod"
    );
  }

  async run(bot, message, args) {
    addMessageToBin(bot, message);
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    //Inicialización de Variables
    const member = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    if (!member) return err.noUserDigitRRole(bot, message);
    let autor = message.author;
    let role = args[1];
    let ObjectMember = null;
    let ObjectAutor = null;
    ObjectAutor = initObjectMember(
      guilds,
      ObjectAutor,
      message.guild.id,
      autor.id
    );
    ObjectMember = initObjectMember(
      guilds,
      ObjectMember,
      message.guild.id,
      member.id
    );
    if (ObjectMember === null)
      return err.noFindMember(bot, message, member.displayName);
    const { moderatorMember, adminMember, inmortalMember } = ObjectAutor;

    //Validaciones - Permisos de Uso - Usuario - Rol - Rol Encontrado
    if (moderatorMember !== 1) return perm.moderatorPerms(bot, message);
    if (!role) return err.noRoleDigit(bot, message);
    role = replaceRoleItems(role);
    let gRole = message.guild.roles.cache.find((rol) => rol.id === role);
    if (!gRole) return err.noRoleFound(bot, message, role);
    //Validaciones Permisos
    if (role === "623715872506118154") return err.roleUnavaible(bot, message);
    if (role === "623716123854110740")
      if (adminMember !== 1) return perm.synksPerms(bot, message);
    if (role === "623716416721518592")
      if (inmortalMember !== 1) return perm.inmortalPerms(bot, message);
    //Ejecución de AddRole
    if (member.roles.cache.has(gRole.id));
    await member.roles.remove(gRole.id);
    //Agregando permisos a usuario en el Archivo Json
    if (role == "623716123854110740") {
      try {
        await updateGuildInmortalMember(message.guild.id, member.id, 0);
      } catch (err) {
        console.log(err);
      }
      try {
        await updateGuildModeratorMember(message.guild.id, member.id, 0);
      } catch (err) {
        console.log(err);
      }
      ObjectMember.inmortalMember = 0;
      ObjectMember.moderatorMember = 0;
      StateManager.emit("updateInmortalMember", message.guild.id, member.id, 0);
      StateManager.emit(
        "updateModeratorMember",
        message.guild.id,
        member.id,
        0
      );
    }
    if (role == "623716416721518592") {
      try {
        await updateGuildModeratorMember(message.guild.id, member.id, 0);
      } catch (err) {
        console.log(err);
      }
      ObjectMember.moderatorMember = 0;
      StateManager.emit(
        "updateModeratorMember",
        message.guild.id,
        member.id,
        0
      );
    }
    //Inicialización de Emojis y su Uso respectivo
    let emojiRol = putEmoji(bot, synchronous.emojiID[0].rol);
    if (message.guild.id != synchronous.guildID) emojiRol = "⚔";
    let emojiCancelado = putEmoji(bot, synchronous.emojiID[0].cancelado);
    if (message.guild.id != synchronous.guildID) emojiCancelado = "⚔";
    //Mensaje Embed para el Comando
    let embed = new MessageEmbed()
      .setTitle(`Synks Roles ${emojiCancelado}`)
      .setDescription(`Se le ha arrebatado un Rol a <@${member.id}>.`)
      .setColor(gRole.color)
      .addField("**Usuario**", `**[${member.displayName}]**`, true)
      .addField("**Rol**", `${emojiRol} <@&${gRole.id}> `, true)
      .addField("**Usuarios con el Rol**", `**${gRole.members.size}** ⚡`, true)

      .setTimestamp();
    let permsArray = [];
    let amountLines = 39;
    let draw = "";
    gRole.permissions.toArray().forEach((perms) => {
      let add = "";
      if (perms.length % 2 === 0) add = "-";
      draw = "-".repeat(Math.floor((amountLines - perms.length) / 2));
      permsArray.push("|" + draw + "[" + perms + "]" + draw + add + "|");
    });
    embed.addField(
      `**Permisos de Rol [${permsArray.length}] - Delegados**`,
      "```css\n" + permsArray.join("\n") + "```"
    );
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 30000, reason: "It had to be done." });
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

StateManager.on("updateInmortalMember", (guildID, memberID, inmortalMember) => {
  let ObjectMember = null;
  ObjectMember = initObjectMember(guilds, ObjectMember, guildID, memberID);
  ObjectMember.inmortalMember = inmortalMember;
});

StateManager.on(
  "updateModeratorMember",
  (guildID, memberID, moderatorMember) => {
    let ObjectMember = null;
    ObjectMember = initObjectMember(guilds, ObjectMember, guildID, memberID);
    ObjectMember.moderatorMember = moderatorMember;
  }
);

StateManager.on("updateAdminMember", (guildID, memberID, adminMember) => {
  let ObjectMember = null;
  ObjectMember = initObjectMember(guilds, ObjectMember, guildID, memberID);
  ObjectMember.adminMember = adminMember;
});

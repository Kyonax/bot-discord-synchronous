//Importación especifica de Metodos - RichEmbed - getMember findUserID putEmoji Function - Errors - caution cancelado Emojis - cautioncolor Color - Perms
const { MessageEmbed } = require("discord.js");
const { putEmoji, initObjectMember } = require("../../utils/misc/functions");
const { updateGuildMemberWarns } = require("../../utils/database/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
const { cautionColor } = require("../../../database/utils/color/color.json");
//Importación de paquetes JS de Node.js
const fs = require("fs");
const ms = require("ms");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const StateManager = require("../../utils/database/StateManager");
//Mapa de Miembros
const guildMembers = new Map();
const guilds = new Map();
//Exportación de Comando Warn
module.exports = class WarnCommand extends BaseCommand {
  constructor() {
    super(
      "warn",
      ["wr", "advertencia"],
      "Comando para hacer un **warn** a un **miembro** del Servidor.",
      "warn <user> <reason>`",
      "**Pilares - Inmortales - Moderadores**",
      "mod"
    );
  }

  async run(bot, message, args) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    //Inicialización de Variables - Usuario - Tiempo - Rol Muted
    let autor = message.author;
    let member = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    let reason = args.join(" ").slice(22);
    let warnChannel = message.guild.channels.cache.find(
      (ch) => ch.name === "🧧・level"
    );
    if (!warnChannel) {
      return message.guild.channels
        .create("🧧・level", {
          type: "text",
          permissionOverwrites: [
            {
              id: message.guild.roles.everyone,
              deny: ["SEND_MESSAGES", "ATTACH_FILES"],
              allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
            },
          ],
        })
        .catch((err) => console.log(err));
    }
    let ObjectAutor = null;
    let ObjectMember = null;    
    ObjectMember = initObjectMember(
      guilds,
      ObjectMember,
      message.guild.id,
      member.id
    );
    if (ObjectMember === null)
      return err.noFindMember(bot, message, member.displayName);
    ObjectAutor = initObjectMember(
      guilds,
      ObjectAutor,
      message.guild.id,
      autor.id
    );
    let { warnings } = ObjectMember;
    const { moderatorMember } = ObjectAutor;
    //Validación de Variables Permisos - Usuario - Razón - Auto Warn - Permisos Restringidos - Canal para enviar El Embed
    if (moderatorMember != 1) return perm.moderatorPerms(bot, message);
    if (!member) return err.noUserDigitWarn(bot, message);
    if (!reason) return err.noReasonDigitWarn(bot, message);
    if (member.id === message.author.id)
      return err.noValidTargetWarn(bot, message);
    if (member.roles.cache.get("623715872506118154"))
      return perm.cantCatchSynks(bor, message);
    warnings++;
    await updateGuildMemberWarns(message.guild.id, member.id, warnings);
    StateManager.emit("updateWarnings", message.guild.id, member.id, warnings);
    //Inicialización de Emojis y su Uso respectivo
    let emoji = putEmoji(bot, synchronous.emojiID[0].caution);
    if (message.guild.id != synchronous.guildID) emoji = "⚠";
    //Mensaje Embed de este Comando
    let warnEmbed = new MessageEmbed()
      .setColor(cautionColor)
      .setTitle(`**Warns** ${emoji}`)
      .setThumbnail(member.user.displayAvatarURL())
      .addField("**Usuario con Warn**", `${member}`, true)
      .addField("**ID**", `***${member.id}***`, true)
      .addField("\u200b", "\u200b", true)
      .addField("**Canal**", message.channel, true)
      .addField("**Número de Warnings**", `**#${warnings}** ${emoji}`, true)
      .addField("\u200b", "\u200b", true)
      .addField("**Razón**", reason)
      .setTimestamp()
      .setFooter(
        `Warn resivido por ${message.author.tag}`,
        message.author.displayAvatarURL()
      );
    //Envio de Mensaje
    warnChannel.send(warnEmbed);
    //Amonestaciones y Castigos
    if (warnings === 3) {
      let mutetime = "60s";
      let muteEmbed = new MessageEmbed()
        .setTitle(`Castigo por Warnings ${emoji}`)
        .setColor(cautionColor)
        .addField(
          "**Usuario Muteado**",
          `<@${member.id}> ha sido **muteado!** por ${ms(ms(mutetime))}`
        )
        .setTimestamp();
      let desMuteEmbed = new MessageEmbed()
        .setTitle(`Castigo por Warnings ${emoji}`)
        .setColor(cautionColor)
        .addField(
          "**Usuario Desmuteado**",
          `<@${member.id}> ha sido **liberado!**`
        )
        .setTimestamp();
      let muterole = message.guild.roles.cache.find(
        (rol) => rol.name === "Muted"
      );
      if (!muterole) return;
      await member.roles.add(muterole.id);
      message.channel.send(muteEmbed).then((msg) => {
        msg.delete({ timeout: 10000, reason: "It had to be done." });
      });
      setTimeout(function () {
        member.roles.remove(muterole.id);
        message.channel.send(desMuteEmbed).then((msg) => {
          msg.delete({ timeout: 10000, reason: "It had to be done." });
        });
      }, ms(mutetime));
    }
    if (warnings == 5) {
    }
    if (warnings == 7) {
    }
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
  "updateModeratorMember",
  (guildID, memberID, moderatorMember) => {
    let ObjectMember = null;
    ObjectMember = initObjectMember(guilds, ObjectMember, guildID, memberID);
    ObjectMember.moderatorMember = moderatorMember;
  }
);

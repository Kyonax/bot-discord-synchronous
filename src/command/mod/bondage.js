//Importación especifica de Metodos - RichEmbed - getMember findUserID putEmoji Functions - Errors - warning Color - caution Emoji
const { MessageEmbed } = require("discord.js");
const { putEmoji, initObjectMember } = require("../../utils/misc/functions");
const { warningColor } = require("../../../database/utils/color/color.json");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación de paquetes JS de Node.js
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
//Exportación de Comando Bondage
module.exports = class BondageCommand extends BaseCommand {
  constructor() {
    super(
      "bondage",
      ["mute", "mutear", "muteado"],
      "Comando para **Mutear** a un miembro del Servidor.",
      "bondage <user> <time>`",
      "***Pilares - Inmortales***",
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
    let mutetime = args[1];
    let muterole = message.guild.roles.cache.find(
      (rol) => rol.name === "Muted"
    );
    let ObjectAutor = null;
    ObjectAutor = initObjectMember(
      guilds,
      ObjectAutor,
      message.guild.id,
      autor.id
    );
    const { moderatorMember } = ObjectAutor;
    //Validación de Variables - Permisos - Usuario - Tiempo - Muteo a si mismo - Usuarios Restringidos para Mutear
    if (moderatorMember != 1) return perm.moderatorPerms(bot, message);
    if (!member) return err.noUserDigitBondage(bot, message);
    if (member.id === message.author.id)
      return err.noValidTargetBondage(bot, message);
    if (!mutetime) return err.noTimeDigit(bot, message);
    if (member.roles.cache.get("623715872506118154"))
      return perm.cantCatchSynks(bot, message);
    //Inicialización de Emojis y su Uso respectivo
    let emoji = putEmoji(bot, synchronous.emojiID[0].caution);
    if (message.guild.id != synchronous.guildID) emoji = "⚠";
    //Embed Usuario Muteado para el Comando
    let muteEmbed = new MessageEmbed()
      .setTitle(`Bondage ${emoji}`)
      .setColor(warningColor)
      .addField(
        "**Usuario Muteado**",
        `<@${member.id}> ha sido **muteado!** por ${ms(ms(mutetime))}`
      )
      .setTimestamp();
    //Embed Usuario Desmuteado para el comando
    let desMuteEmbed = new MessageEmbed()
      .setTitle(`Bondage ${emoji}`)
      .setColor(warningColor)
      .addField(
        "**Usuario Desmuteado**",
        `<@${member.id}> ha sido **liberado!**`
      )
      .setTimestamp();
    //al Canal en el que se usó el Comando - Función para esperar cierto Tiempo y Desmutear al Usuario
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

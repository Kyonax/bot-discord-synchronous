//Importación especifica de Metodos - findUserID putEmoji Functions
const { MessageEmbed } = require("discord.js");
const {
  initObjectMember,
  getMember,
  replaceRoleItems,
} = require("../../utils/misc/functions.js");
const { goldColor } = require("../../../database/utils/color/color.json");
const { addMessageToBin } = require("../../utils/misc/bin");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de Usuario
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación de la Clase Padre y Conexión con la Base de Datos
const BaseCommand = require("../../../src/utils/structure/BaseCommand.js");
const StateManager = require("../../utils/database/StateManager");
//Mapa de Miembros
const guildMembers = new Map();
const guilds = new Map();
//Exportación de Comando Poll
module.exports = class PollCommand extends BaseCommand {
  constructor() {
    super(
      "poll",
      ["encuesta", "enc"],
      "Comando para **realizar una encuesta** en el Servidor.",
      "poll`\n**Opciones:** `<rol>`",
      "_***Pilares - Inmortales - Moderadores***_",
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
    const autor = getMember(message, message.author.id);
    let [cmd, role] = message.content.split(" ");
    let poll = args.slice(1).join(" ");
    let ObjectAuthor = null;
    ObjectAuthor = initObjectMember(
      guilds,
      ObjectAuthor,
      message.guild.id,
      autor.id
    );
    //Permisos de Autor
    const { moderatorMember } = ObjectAuthor;
    //Validaciones - Permisos de Uso - Usuario - Rol - Rol Encontrado
    if (moderatorMember !== 1) return perm.moderatorPerms(bot, message);
    if (!role.includes("@")) {
      role = "@everyone";
      poll = args.slice(0).join(" ");
    }
    role = replaceRoleItems(role);
    let gRole = message.guild.roles.cache.find((rol) => rol.id == role);
    //Creación del Mensaje Embed
    let embed = new MessageEmbed()
      .setTitle(`**${autor.displayName}'s Poll 📜**`)
      .setThumbnail(bot.user.displayAvatarURL())
      .setDescription(poll)
      .setColor(goldColor)
      .addField("**Usuario**", `${autor}`, true)
      .addField(
        `**Encuesta para - [${gRole.name}]**`,
        `**Enviado desde ${message.channel}**`,
        true
      )
      .setFooter("Encuestas y Sorteos Synchronous")
      .setTimestamp();

    const encChannel = message.guild.channels.cache.find(
      (ch) => ch.name === "⋉⧼📬⧽⋊encuestas⦊"
    );
    if (!encChannel) {
      return message.guild.channels
        .create("⋉⧼📬⧽⋊encuestas⦊", {
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

    encChannel.send(`Nueva encuesta para ${gRole}!!🎊`);
    encChannel.send(embed);
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

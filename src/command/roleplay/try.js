//Importación especifica de Metodos -  MessageEmbed - Errors - dangerColor lighyellowcolor Color - Rewards
const { MessageEmbed } = require("discord.js");
const {
  dangerColor,
  lightYellowColor,
} = require("../../../database/utils/color/color.json");
const { initObjectMember } = require("../../utils/misc/functions");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
let { levelRoleRewards } = require("../../../database/conectors/rewards");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const StateManager = require("../../utils/database/StateManager");
//Mapas
const rolePlayMembers = new Map();
const guildsRoleplay = new Map();
//Exportación de Comando Try
module.exports = class TryCommand extends BaseCommand {
  constructor() {
    super(
      "try",
      ["intentar"],
      "Comando para **Intentar** algo **Roleplay**.",
      "try <text>`\n**Opciones:** `<user>`",
      "Todos",
      "roleplay"
    );
  }
  async run(bot, message, args) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const perm = new Perms();
    const err = new Error();
    //Inicialización de Variable Autor - Validación de Nivel requerido para Ejecutar el Comando
    let autor = message.author;
    let ObjectAuthor = null;
    ObjectAuthor = initObjectMember(
      guildsRoleplay,
      ObjectAuthor,
      message.guild.id,
      autor.id
    );
    let { memberLevel } = ObjectAuthor;
    if (!memberlevel) return perm.notRoleLevel(bot, message, 3);
    if (memberLevel < 3) return perm.notRoleLevel(bot, message, 3);
    //Recompensas de Niveles de Rol Usando comandos de Rol
    levelRoleRewards(message, bot);
    //Inicializavión de la Variable Member - Content
    let member = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    let content = args.slice(0).join(" ");
    //Validadción si no atrapa a un Usuario
    if (!member || autor.id === member.id) {
      //Validacion de Error
      if (!content) return err.noContentDigit(bot, message);
      const action = Math.random() * 100;
      const actionIndex = Math.floor(action / 10);
      const actionPercent = Math.floor(action);
      const actionLevel =
        "🟩".repeat(actionIndex) + "🟥".repeat(10 - actionIndex);
      let actionEject = "None";

      let embed = new MessageEmbed().setThumbnail(autor.displayAvatarURL());

      if (action >= 50) {
        embed.addField(
          `🌈 **${message.member.displayName}** intentó **${content}** y lo logró.`,
          `La potencia que usó para **${content}** fue de **${actionPercent}%** \n\n${actionLevel}`
        );
        embed.setColor(lightYellowColor);
      } else {
        embed.addField(
          `🌫 **${message.member.displayName}** intentó **${content}** y falló.`,
          `La potencia que usó para **${content}** fue de **${actionPercent}%** \n\n${actionLevel}`
        );
        embed.setColor(dangerColor);
      }

      message.channel.send(embed);
    } else {
      content = content.replace("<", "");
      content = content.replace("!", "");
      content = content.replace("@", "");
      content = content.replace("624704701283434536", "");
      content = content.replace(
        guildsRoleplay.get(message.guild.id).Member.forEach((memb) => {
          memb.id;
        }),
        ""
      );
      content = content.replace(">", "");
      if (!content) return err.noContentDigit(bot, message);

      const action = Math.random() * 100;
      const actionIndex = Math.floor(action / 10);
      const actionPercent = Math.floor(action);
      const actionLevel =
        "🟩".repeat(actionIndex) + "🟥".repeat(10 - actionIndex);
      let actionEject = "None";

      let embed = new MessageEmbed().setThumbnail(
        member.user.displayAvatarURL()
      );

      if (action >= 50) {
        embed.addField(
          `🌈 **${message.member.displayName}** intentó **${content}** **${member.displayName}** y lo logró.`,
          `La potencia que usó para **${content}** **${member.displayName}** fue de **${actionPercent}%** \n\n${actionLevel}`
        );
        embed.setColor(lightYellowColor);
      } else {
        embed.addField(
          `🌫 **${message.member.displayName}** intentó **${content}** **${member.displayName}** y falló.`,
          `La potencia que usó para **${content}** **${member.displayName}** fue de **${actionPercent}%** \n\n${actionLevel}`
        );
        embed.setColor(dangerColor);
      }
      message.channel.send(embed);
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

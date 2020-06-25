//Importación especifica de Metodos - RichEmbed - getMember replaceUserItemsMention Functions - Errors - clevercolor Color - Rewards
const { MessageEmbed } = require("discord.js");
const { getMember, initObjectMember } = require("../../utils/misc/functions");
const { lightblueColor } = require("../../../database/utils/color/color.json");
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
//Exportación de Comando Fuck
module.exports = class PatCommand extends BaseCommand {
  constructor() {
    super(
      "pat",
      ["acariciar"],
      "Comando para **Acariciar** a un **Miembro** del **Servidor**.",
      "pat <user>`",
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
    //Inicialización de Variable Autor
    let autor = message.author;
    const member = getMember(message, args[0]);
    let ObjectAuthor = null;
    ObjectAuthor = initObjectMember(
      guildsRoleplay,
      ObjectAuthor,
      message.guild.id,
      autor.id
    );
    let { memberLevel } = ObjectAuthor;
    if (memberLevel < 12) return perm.notRoleLevel(bot, message, 12);
    //Recompensas de Niveles de Rol Usando comandos de Rol
    levelRoleRewards(message, bot);
    //Inicialización Usuario - Gifs Array - Selección de Gifs
    let replies = [
      "https://media1.tenor.com/images/bb5608910848ba61808c8f28caf6ec7d/tenor.gif?itemid=11039783",
      "https://media1.tenor.com/images/b37704c48cf5c5e1f0e4348cd73ef056/tenor.gif?itemid=15693493",
      "https://i.pinimg.com/originals/8b/42/6c/8b426c9bedc37054cd7e73925fa10da5.gif",
      "https://media1.tenor.com/images/1d702b7ae909f9926e523125f4b36469/tenor.gif?itemid=15173241",
      "https://i.pinimg.com/originals/e3/e2/58/e3e2588fbae9422f2bd4813c324b1298.gif",
      "https://thumbs.gfycat.com/FlimsyDeafeningGrassspider-small.gif",
      "https://media1.tenor.com/images/9bf3e710f33cae1eed1962e7520f9cf3/tenor.gif?itemid=13236885",
      "https://i.pinimg.com/originals/94/91/16/949116f16d90fd2cff3fbccf477cd091.gif",
      "https://media1.tenor.com/images/c0bcaeaa785a6bdf1fae82ecac65d0cc/tenor.gif?itemid=7453915",
      "https://pa1.narvii.com/6475/c7659ee8c274433cd19b6d2465aa784dcb263348_hq.gif",
      "https://media1.tenor.com/images/8c1f6874db27c8227755a08b2b07740b/tenor.gif?itemid=10789367",
      "https://media2.giphy.com/media/N0CIxcyPLputW/giphy.gif",
      "https://i.pinimg.com/originals/67/b5/ae/67b5ae61715fc6df209ce26d7d83c9ee.gif",
      "https://i.pinimg.com/originals/c2/23/2a/c2232aec426d8b5e85e026cbca410463.gif",
      "https://thumbs.gfycat.com/NippyWeeAkitainu-size_restricted.gif",
      "https://data.whicdn.com/images/297125550/original.gif",
    ];
    let result = Math.floor(Math.random() * replies.length);
    //Embed
    let embed = new MessageEmbed()
      .setColor(lightblueColor)
      .setDescription(`**<@${autor.id}>** acarició a **<@${member.id}>** 💝`)
      .setImage(replies[result]);
    message.channel.send(embed);
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

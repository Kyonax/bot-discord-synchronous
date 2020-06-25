//Importación especifica de Metodos - RichEmbed - getMember - Errors - warningcolor Color - Rewards
const { MessageEmbed } = require("discord.js");
const { getMember, initObjectMember } = require("../../utils/misc/functions");
const { warningColor } = require("../../../database/utils/color/color.json");
//Importación Clase de Objetos - Conector Perms
const Perms = require("../../../database/conectors/perm");
let { levelRoleRewards } = require("../../../database/conectors/rewards");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const StateManager = require("../../utils/database/StateManager");
//Mapas
const rolePlayMembers = new Map();
const guildsRoleplay = new Map();
//Exportación de Comando Hug
module.exports = class HugCommand extends BaseCommand {
  constructor() {
    super(
      "hug",
      ["abrazar"],
      "Comando para **Abrazar** a un **Miembro del Servidor**.",
      "hug <user>`",
      "Todos",
      "roleplay"
    );
  }
  async run(bot, message, args) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const perm = new Perms();
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
    if (memberLevel < 6) return perm.notRoleLevel(bot, message, 6);
    //Recompensas de Niveles de Rol Usando comandos de Rol
    levelRoleRewards(message, bot);
    //Inicialización de Variables Usuario - Gifs - Selección de Gifs
    const member = getMember(message, args.join(" "));
    let replies = [
      "https://media.giphy.com/media/du8yT5dStTeMg/giphy.gif",
      "https://media.giphy.com/media/143v0Z4767T15e/giphy.gif",
      "https://media.giphy.com/media/lrr9rHuoJOE0w/giphy.gif",
      "https://media.giphy.com/media/qscdhWs5o3yb6/giphy.gif",
      "https://media1.tenor.com/images/4ba5c04950f4a7dfc18646d372619212/tenor.gif?itemid=14566836",
      "https://i.pinimg.com/originals/02/7e/0a/027e0ab608f8b84a25b2d2b1d223edec.gif",
      "https://media1.tenor.com/images/6262924b0b8cd9e0089c77d80d30e0c9/tenor.gif?itemid=15793133",
      "https://i.pinimg.com/originals/ab/58/a8/ab58a8f3ad91fd62911f84bf3d54127c.gif",
      "https://i.pinimg.com/originals/f9/e9/34/f9e934cddfd6fefe0079ab559ef32ab4.gif",
      "https://i.pinimg.com/originals/6d/e7/d8/6de7d824d79a92955e312e3d84d71b82.gif",
      "https://data.whicdn.com/images/203117037/original.gif",
      "https://cdn.lowgif.com/full/8dedb4ccc95e70c7-anime-hug-gif-google-search-cl-n-n-m-pinterest.gif",
      "https://media.giphy.com/media/KL7xA3fLx7bna/giphy.gif",
      "https://media.giphy.com/media/16bJmyPvRbCDu/giphy.gif",
      "https://media.giphy.com/media/gnXG2hODaCOru/giphy.gif",
      "https://media.giphy.com/media/JzsG0EmHY9eKc/giphy.gif",
      "https://media.giphy.com/media/ew8hN0QnkoaOdTn2Eo/giphy.gif",
      "https://media.giphy.com/media/4vDQtFRvx5ZSM/giphy.gif",
      "https://media.giphy.com/media/3oz8xt8ebVWCWujyZG/giphy.gif",
      "https://media.giphy.com/media/4No2q4ROPXO7T6NWhS/giphy.gif",
    ];
    let result = Math.floor(Math.random() * replies.length);
    //Mensaje Embed
    let embed = new MessageEmbed()
      .setColor(warningColor)
      .setDescription(`**<@${autor.id}>** abrazó a **<@${member.id}>** 💗`)
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

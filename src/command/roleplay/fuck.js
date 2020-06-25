//Importación especifica de Metodos - RichEmbed - getMember replaceUserItemsMention Functions - Errors - clevercolor Color - Rewards
const { MessageEmbed } = require("discord.js");
const { getMember, initObjectMember } = require("../../utils/misc/functions");
const { cleverColor } = require("../../../database/utils/color/color.json");
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
module.exports = class FuckCommand extends BaseCommand {
  constructor() {
    super(
      "fuck",
      ["follar", "sexo", "darlechita", "daramor", "givelove"],
      "Comando para **Follarte** a tu **Esposo/a**.",
      "fuck <user>`",
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
    if (!message.channel.nsfw) return err.noValidChannel(bot, message);
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
    if (memberLevel < 18) return perm.notRoleLevel(bot, message, 18);
    //Recompensas de Niveles de Rol Usando comandos de Rol
    levelRoleRewards(message, bot);
    //Inicialización Usuario - Gifs Array - Selección de Gifs
    let replies = [
      "https://66.media.tumblr.com/tumblr_m42zt9xfWo1rr0a3oo3_500.gif",
      "https://xxxpicss.com/xxx/xxx-missionary-fucking-tumblr-xxx-3.gif",
      "https://pornogifs.net/wp-content/uploads/2019/10/58022784.gif",
      "https://www.welovegoodsex.com/wp-content/uploads/2013/11/tumblr_mvn26wj0ys1sk2jxio1_500.gif",
      "https://burcars.com/img/319189.gif",
      "https://68.media.tumblr.com/3cf4fd6017e7fd5dee8c29b012d1b61f/tumblr_n5kkd4BVFN1tuedp8o1_500.gif",
      "https://1.bp.blogspot.com/-5ZArXlBBiFc/VltodLtaH0I/AAAAAAAAMnE/_ivPADoO0k4/s1600/tumblr_mfqvq87Vgm1qm7d6go1_r1_500.gif",
      "https://pornogifs.net/wp-content/uploads/2019/12/58476142.gif",
      "https://cdnio.luscious.net/Plonker/347111/arhoangel-artist-brigitte-overwatch-overwatch-50397_01DG89WJ084CYVJPS8KKH25JV5.gif",
      "https://overwatchporn.xxx/wp-content/uploads/2016/08/Tracer-Doggystyle.gif",
      "https://funkyimg.com/i/2bPEL.gif",
      "https://thumb-p7.xhcdn.com/a/a2s4c1f3WnSu6q5VgV-m0g/000/100/699/237_1000.gif",
      "http://www.reuni.eu/image/131170.gif",
      "http://juicygif.com/albums/userpics/2016y/07/20/11/1/0984-kiss-amp-fuck.gif",
      "https://sexvideogif.com/wp-content/uploads/2018/11/tumblr_os9xroLXB41tawcdjo3_500.gif",
      "https://media1.giphy.com/media/pRcGFCFUl4edO/giphy.gif",
      "https://scribespad.files.wordpress.com/2017/05/dangerous-passion2.gif",
      "https://thumbs.gfycat.com/SentimentalImpishCrocodileskink-small.gif",
      "https://46.media.tumblr.com/368ef0ec384d5910d8dad9a24799f0b4/tumblr_n4d9ggOBKR1qioyw0o1_540.gif",
    ];
    let result = Math.floor(Math.random() * replies.length);
    //Embed
    let embed = new MessageEmbed()
      .setColor(cleverColor)
      .setDescription(`**<@${autor.id}>** se folló a **<@${member.id}>** 💦`)
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

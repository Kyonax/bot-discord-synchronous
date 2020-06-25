//Importación especifica de Metodos - RichEmbed - getMember - Errors - lovecolor COlor - Rewards
const { MessageEmbed } = require("discord.js");
const { getMember, initObjectMember } = require("../../utils/misc/functions");
const { loveColor } = require("../../../database/utils/color/color.json");
let { levelRoleRewards } = require("../../../database/conectors/rewards");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const StateManager = require("../../utils/database/StateManager");
//Mapas
const rolePlayMembers = new Map();
const guildsRoleplay = new Map();
//Exportación de Comando Fuck
module.exports = class KissCommand extends BaseCommand {
  constructor() {
    super(
      "kiss",
      ["besar", "chupetear"],
      "Comando para **Besar** a un **Miembro del Servidor**.",
      "kiss <user>`",
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
    //Inicialización de Variables Autor - Usuario
    let autor = message.author;
    let ObjectAuthor = null;
    ObjectAuthor = initObjectMember(
      guildsRoleplay,
      ObjectAuthor,
      message.guild.id,
      autor.id
    );
    let { memberLevel } = ObjectAuthor;
    if (memberLevel < 9) return perm.notRoleLevel(bot, message, 9);
    //Recompensas de Niveles de Rol Usando comandos de Rol
    levelRoleRewards(message, bot);
    const member = getMember(message, args.join(" "));
    //Inicialización Usuario - Gifs Array - Selección de Gifs
    let replies = [
      "https://media.giphy.com/media/V5b0MPtVa9OKs/giphy.gif",
      "https://media.giphy.com/media/p7JvpGslTuQ1i/giphy.gif",
      "https://media.giphy.com/media/nyGFcsP0kAobm/giphy.gif",
      "https://media.giphy.com/media/l0ErGjnSKbCcNVoZi/giphy.gif",
      "https://media.giphy.com/media/wOtkVwroA6yzK/giphy.gif",
      "https://media.giphy.com/media/hnNyVPIXgLdle/giphy.gif",
      "https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif",
      "https://media.giphy.com/media/c9IOSVxKk7vz2/giphy.gif",
      "https://media.giphy.com/media/HKQZgx0FAipPO/giphy.gif",
      "https://media.giphy.com/media/A3zC3cvchiWdO/giphy.gif",
      "https://media.giphy.com/media/xULW8pgVrJu6ieAZ4k/giphy.gif",
      "https://media.giphy.com/media/j5XTZtI4Wfzu8/giphy.gif",
      "https://media.giphy.com/media/11gQjVqZlamRLW/giphy.gif",
      "https://media.giphy.com/media/NHUgFatYX6gXS/giphy.gif",
      "https://media.giphy.com/media/Q7Fb1284CSA88olS92/giphy.gif",
      "https://media.giphy.com/media/30Fv2j06ZdT8c/giphy.gif",
      "https://media.giphy.com/media/FqeZLK7XvhRL2/giphy.gif",
      "https://media.giphy.com/media/iFVRNNztsjdJu/giphy.gif",
      "https://media.giphy.com/media/3o6wrm5BBt7opmAIzS/giphy.gif",
      "https://media.giphy.com/media/xUA7aZ3AokwQZ8hP7G/giphy.gif",
      "https://media.giphy.com/media/Xm13I4qG7dja/giphy.gif",
      "https://media.giphy.com/media/rFC46uwKaM7XW/giphy.gif",
      "https://media.giphy.com/media/l4pTi7y6kietWoyfm/giphy.gif",
      "https://media.giphy.com/media/69jGBCWzSsyPURJlwv/giphy.gif",
      "https://media.giphy.com/media/OKQD2eTLv1Rqo/giphy.gif",
      "https://media.giphy.com/media/ZRSGWtBJG4Tza/giphy.gif",
      "https://media.giphy.com/media/pmDvHu7MmorxS/giphy.gif",
      "https://media.giphy.com/media/fxUl1YE3Mr7l6/giphy.gif",
      "https://media.giphy.com/media/8S7AdjKCG6OqY/giphy.gif",
      "https://media.giphy.com/media/eS2iNs69nd9Ty/giphy.gif",
      "https://media.giphy.com/media/eI9d50wLFqT5e/giphy.gif",
      "https://media.giphy.com/media/uSHX6qYv1M7pC/giphy.gif",
      "https://media.giphy.com/media/111B2dBZbSM7ja/giphy.gif",
      "https://media.giphy.com/media/vTfFCC3rSfKco/giphy.gif",
      "https://media.giphy.com/media/ZZuoLNbS35Wve/giphy.gif",
      "https://media.giphy.com/media/uuBrIaztvtb2M/giphy.gif",
    ];
    let result = Math.floor(Math.random() * replies.length);
    //Embed
    let kissEmbed = new MessageEmbed()
      .setColor(loveColor)
      .setDescription(
        `**<@${autor.id}>** le dio un beso a **<@${member.id}>** 💞`
      )
      .setImage(replies[result]);
    message.channel.send(kissEmbed);
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

//Importación especifíca de Metodos - MessageEmbed - putEmoji Function - functions Database - Colors
const { MessageEmbed } = require("discord.js");
const {
  putEmoji,
  initObjectMember,
  sortServerRanks,
} = require("../../utils/misc/functions");
const { generateXP, limitLevel } = require("../../utils/logic/logicMember");
const { generateCoins } = require("../../utils/logic/logicBank");
const {
  memberExist,
  insertMember,
  insertMemberMap,
  insertBankMemberMap,
  memberBankExist,
  insertMemberBank,
  updateGuildMemberXP,
  updateGuildBankCoins,
  updateGuildMemberBoost,
} = require("../../utils/database/functions");
const { reactionEmbeds } = require("../../utils/misc/reaction");
const { attachMessageImage } = require("../../utils/misc/attachment");
const {
  cleverColor,
  thrizzColor,
} = require("../../../database/utils/color/color.json");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación de cuerpo de Eventos e importación de Conexión Base de Datos
const BaseEvent = require("../../utils/structure/BaseEvent");
const StateManager = require("../../utils/database/StateManager");
//Mapa de pregijos guildCommandPrefix
const guildCommandPrefix = new Map();
const guildMembers = new Map();
const guildMembersBank = new Map();
const bankGuilds = new Map();
const guilds = new Map();
//Inicialización de Variables Cooldown
let cooldown = new Set();
let cdseconds = 3;
//Exportación de Evento message
module.exports = class MessageEvent extends BaseEvent {
  //Constructor del Objeto
  constructor() {
    super("message");
    //Conexión con la Base de Datos por medio de StateManager
    this.connection = StateManager.connection;
  }
  async run(bot, message) {
    //Reaction specific MessageEmbeds
    await reactionEmbeds(bot, message);
    //Attachment Message
    const attachment = message.attachments;
    attachment.forEach((messageAttachment) => {
      attachMessageImage(messageAttachment);
    });
    //No DMS no Bot Messages
    if (message.author.bot || message.channel.type === "dm") return;
    //Inicialización de Variables guildID - memeberID
    const guildID = message.guild.id;
    const userID = message.author.id;
    //Desición es un Comando o No
    const existMemberBank = (await memberBankExist(guildID, userID))[0];
    const existMember = (await memberExist(guildID, userID))[0];
    //Validación si no Existe El Usuario
    if (existMember.length === 0 || existMemberBank.length === 0) {
      await insertMember(guildID, userID)
        .then(() =>
          console.log("Nuevo Usuario Agregado a la Tabla GuildMembers")
        )
        .catch((err) => console.log(err));
      await insertMemberMap(guildID, userID, guildMembers, guilds)
        .then(() => console.log("Nuevo Usuario Agregado al Mapa GuildMembers"))
        .catch((err) => console.log(err));
      await insertMemberBank(guildID, userID)
        .then(() => console.log("Nuevo Usuario Agregado a la Tabla GuildBank"))
        .catch((err) => console.log(err));
      await insertBankMemberMap(guildID, userID, guildMembersBank, bankGuilds)
        .then(() => console.log("Nuevo Usuario Agregado al Mapa GuildBank"))
        .catch((err) => console.log(err));
      return;
    }
    //Get the ObjectMember by Maps
    let objectMember = null;
    objectMember = initObjectMember(
      guilds,
      objectMember,
      message.guild.id,
      message.author.id
    );
    //Get the ObjectBankMember by Maps
    let objectBankMember = null;
    objectBankMember = initObjectMember(
      bankGuilds,
      objectBankMember,
      message.guild.id,
      message.author.id
    );
    //Prefix del Servidor
    const prefix = guildCommandPrefix.get(message.guild.id);
    const digitPrefix = message.content.slice(0, prefix.length);
    if (digitPrefix === prefix) {
      const [cmdName, ...cmdArgs] = message.content
        .slice(prefix.length)
        .split(/\s+/);
      const command =
        bot.commands.get(cmdName) || bot.commands.get(bot.aliases.get(cmdName));
      if (command) {
        //Validación El usuario es un Administrador
        const { inmortalMember, memberID } = objectMember;
        if (inmortalMember === 0) {
          if (cooldown.has(memberID)) {
            message.delete();
            const emojiCancelado = synchronous.emojiID[0].cancelado;
            if (guildID === synchronous.guildID) {
              return message.reply(
                ` ${putEmoji(
                  bot,
                  emojiCancelado
                )} Debes esperar almenos **${cdseconds}s** para usar otro comando.`
              );
            } else {
              return message.reply(
                ` ❌ Debes esperar almenos **${cdseconds}s** para usar otro comando.`
              );
            }
          } else {
            command.run(bot, message, cmdArgs);
          }
          cooldown.add(memberID);
        } else {
          command.run(bot, message, cmdArgs);
        }
        setTimeout(() => {
          cooldown.delete(memberID);
        }, cdseconds * 1000);
      }
    } else {
      if (existMember.length > 0 || existMemberBank.length > 0) {
        //Inicialización de Variables por Objetos
        const { memberCoins } = existMemberBank[0];
        const {
          memberID,
          memberXP,
          memberLevel,
          memberBoost,
          boostMemberTime,
        } = objectMember;
        //Ganancia de XP por Miembro
        const curboost = parseInt(memberBoost);
        if (curboost > 1) {
          let curBoostTime = parseInt(boostMemberTime);
          curBoostTime = curBoostTime - 1;
          const upadateMemberBoostTime = await updateGuildMemberBoost(
            guildID,
            memberID,
            curboost,
            curBoostTime
          );
          StateManager.emit(
            "updateBoostMemberTime",
            guildID,
            memberID,
            curboost,
            curBoostTime
          );
          objectMember.boostMemberTime = curBoostTime;
          if (curBoostTime === 0) {
            const updateMemberBoost = await updateGuildMemberBoost(
              guildID,
              memberID,
              1,
              curBoostTime
            );
            StateManager.emit(
              "updateMemberBoost",
              guildID,
              memberID,
              1,
              curBoostTime
            );
            objectMember.memberBoost = 1;
            //Inicialización de Variables Emojis - guildEmojis
            const emojiF = putEmoji(bot, synchronous.emojiID[0].f);
            const emojiBoostB = putEmoji(bot, synchronous.emojiID[0].boostb);
            const emojiBoostA = putEmoji(bot, synchronous.emojiID[0].boosta);
            const emojiBoostP = putEmoji(bot, synchronous.emojiID[0].boostp);
            if (message.guild.id != synchronous.guildID) {
              emojiF = "⛔";
              emojiBoostB = "🔰";
              emojiBoostA = "🔰";
              emojiBoostP = "🔰";
            }
            //Mensaje EMBED de se acabo el Boost
            const timeOutEmbed = new MessageEmbed()
              .setAuthor(
                `**${message.author.username}'s Boost**`,
                bot.user.displayAvatarURL()
              )
              .setThumbnail(message.author.displayAvatarURL())
              .setColor(thrizzColor)
              .addField(
                "**Plebeyo**",
                `<@${message.author.id}> se terminó tu **boost** de experiencia`
              )
              .setFooter("Caza Recompensas Internacionales de Synchronous")
              .setTimestamp()
              .setTitle(`**Boost Terminado** ${emojiF}`)
              .addField(
                "**Boosts de Experiencia**",
                `Si deseas **comprar** otro usa ` +
                  "`" +
                  guildCommandPrefix.get(guildID) +
                  "payboost <base> `" +
                  `${emojiBoostB}` +
                  " Ó `<avanzado> `" +
                  `${emojiBoostA}` +
                  " Ó `<premium>`" +
                  `${emojiBoostP}`
              );
            message.channel.send(timeOutEmbed);
          }
        }
        //Inicialización de Variables memberXP
        const xp = generateXP(parseInt(memberBoost));
        let updateXP = xp + parseInt(memberXP);
        const newLevel = limitLevel(updateXP, parseInt(memberLevel));
        if (newLevel > memberLevel) {
          const emojiLevelUp = synchronous.emojiID[0].levelup;
          const levelChannel = message.guild.channels.cache.find(
            (ch) => ch.name === "🧧・level"
          );
          if (!levelChannel) {
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
          const levelUpEmbed = new MessageEmbed()
            .setAuthor(message.author.username, bot.user.displayAvatarURL())
            .setColor(cleverColor)
            .setThumbnail(message.author.displayAvatarURL())
            .addField(
              "**Usuario Iluminado**",
              `<@${message.author.id}> alcanzó un nuevo **Nivel**.`
            )
            .addField("**Nivel Alcanzado**", `Nuevo nivel **${newLevel}**`)
            .setFooter("Estadísticas de niveles Internacional de Synchronous")
            .setTimestamp();
          if (guildID === synchronous.guildID) {
            levelUpEmbed.setTitle(
              `**Nivel Alcanzado** ${putEmoji(bot, emojiLevelUp)}`
            );
            levelChannel.send(levelUpEmbed);
          } else {
            levelUpEmbed.setTitle(`**Nivel Alcanzado** 💠`);
            levelChannel.send(levelUpEmbed);
          }
        }
        const updateMemberXP = await updateGuildMemberXP(
          guildID,
          memberID,
          updateXP,
          newLevel
        );
        StateManager.emit(
          "updateMemberXP",
          guildID,
          memberID,
          updateXP,
          newLevel
        );
        objectMember.memberLevel = newLevel;
        objectMember.memberXP = updateXP;
        //Ganancia de Coins por Miembro
        const coins = generateCoins();
        let newCoins = coins + parseInt(memberCoins);
        const updateMemberCoins = await updateGuildBankCoins(
          guildID,
          memberID,
          newCoins
        );
        StateManager.emit("updateCoins", guildID, memberID, newCoins);
        objectBankMember.memberCoins = newCoins;
        //Rank Members
        let usersRank = [];
        const updateServerRanks = await sortServerRanks(
          usersRank,
          guilds,
          message,
          StateManager
        );
      }
    }
  }
};

StateManager.on("prefixFetched", (guildID, prefix) => {
  guildCommandPrefix.set(guildID, prefix);
});

StateManager.on("prefixUpdate", (guildID, prefix) => {
  guildCommandPrefix.set(guildID, prefix);
});

StateManager.on(
  "bankMembersFetched",
  (membersBank, guildID, memberID, memberCoins) => {
    guildMembersBank.set(memberID, {
      memberID: memberID,
      guildID: guildID,
      memberCoins: memberCoins,
    });
    bankGuilds.set(guildID, {
      Member: membersBank,
    });
  }
);

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

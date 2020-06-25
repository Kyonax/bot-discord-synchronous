const { MessageEmbed } = require("discord.js");
const {
  putEmoji,
  getMember,
  initObjectMember,
  sortRolePlayRanks,
} = require("../../src/utils/misc/functions");
const { synchronous } = require("../utils/emojis/emojis.json");
const { noneColor, cleverColor } = require("../utils/color/color.json");
const {
  memberRolePlayExist,
  insertRolePlayMember,
  insertRolePlayMemberMap,
  updateGuildMemberXP,
  updateGuildBankCoins,
  updateGuildRolePlayMemberXP,
  updateGuildMemberBoost,
} = require("../../src/utils/database/functions");
const {
  generateRolePlayXP,
  limitLevel,
} = require("../../src/utils/logic/logicMember");
//StateManager
const StateManager = require("../../src/utils/database/StateManager");
//Mapas
const guildMembers = new Map();
const guildMembersBank = new Map();
const guilds = new Map();
const bankGuilds = new Map();
const rolePlayMembers = new Map();
const guildsRoleplay = new Map();
//Exportación de Evento Rewards
module.exports.levelRoleRewards = async (message, bot) => {
  //Inicialización de Variables guildID - memeberID
  const guildID = message.guild.id;
  const userID = message.author.id;
  //Existencia del Usuario en la Base de Datos
  const existMember = (await memberRolePlayExist(guildID, userID))[0];
  let gameRolePlay = [];
  let gtaRol = message.guild.roles.cache.find(
    (rol) => rol.name === "GtaSanAndreas"
  );
  let mbRol = message.guild.roles.cache.find(
    (rol) => rol.name === "MountAndBlade"
  );
  const autor = getMember(message, message.author.id);
  if (gtaRol)
    if (autor.roles.cache.has(gtaRol.id)) gameRolePlay.push(gtaRol.name);
  if (mbRol) if (autor.roles.cache.has(mbRol.id)) gameRolePlay.push(mbRol.name);
  //Validación sobre su Existencia
  if (existMember.length === 0) {
    await insertRolePlayMemberMap(
      guildID,
      userID,
      rolePlayMembers,
      guildsRoleplay,
      gameRolePlay.join(", ")
    )
      .then(() =>
        console.log("Nuevo Usuario Agregado a la Tabla RolePlayMembers")
      )
      .catch((err) => console.log(err));
    await insertRolePlayMember(guildID, userID, gameRolePlay.join(", "))
      .then(() =>
        console.log("Nuevo Usuario Agregado a la Tabla RolePlayMembers")
      )
      .catch((err) => console.log(err));
  } else {
    //Inicialización de Variables Por Objetos
    let ObjectMember = null;
    let ObjectMemberRolePlay = null;
    let ObjectBankMember = null;
    ObjectMember = initObjectMember(guilds, ObjectMember, guildID, userID);
    ObjectMemberRolePlay = initObjectMember(
      guildsRoleplay,
      ObjectMemberRolePlay,
      guildID,
      userID
    );
    ObjectBankMember = initObjectMember(
      bankGuilds,
      ObjectBankMember,
      guildID,
      userID
    );
    let { boostMemberTime } = ObjectMember;
    let { memberID, memberXP, memberLevel } = ObjectMemberRolePlay;
    //Logica de Niveles
    const xp = generateRolePlayXP(parseInt(ObjectMember.memberBoost));
    let updateXP = xp + parseInt(memberXP);
    const newLevel = limitLevel(updateXP, parseInt(memberLevel));
    let xpReward = parseInt(ObjectMember.memberLevel) * 100;
    let coinsReward = xpReward * 2;
    let boostTimeBase = 1000;
    let addBoost = "";
    //Canal de Niveles
    const levelChannel = message.guild.channels.cache.find(
      (ch) => ch.name === "💠-niveles-levels"
    );
    //Emoji según la Guild
    let emojiLevelUp = putEmoji(bot, synchronous.emojiID[0].levelup);
    if (message.guild.id != synchronous.guildID) emojiLevelUp = "💠";
    let emojiRewardBag = putEmoji(bot, synchronous.emojiID[0].rewardbag);
    if (message.guild.id != synchronous.guildID) emojiRewardBag = "🎉";
    let emojiSynkoin = putEmoji(bot, synchronous.emojiID[0].synkoin);
    if (message.guild.id != synchronous.guildID) emojiSynkoin = "💰";
    let emojiBoostB = putEmoji(bot, synchronous.emojiID[0].boostb);
    if (message.guild.id != synchronous.guildID) emojiBoostB = "💰";
    //Nuevo Nivel
    if (newLevel > memberLevel) {
      //Actualización Base de Datos Roleplay XP - Rank
      const updateRolePlayMemberXP = await updateGuildRolePlayMemberXP(
        guildID,
        memberID,
        updateXP,
        newLevel
      );
      StateManager.emit(
        "updateRolePlayMemberXP",
        guildID,
        memberID,
        updateXP,
        newLevel
      );
      memberXP = updateXP;
      memberLevel = newLevel;
      //Rank RolePlayMembers
      let usersRank = [];
      const updateServerRanks = await sortRolePlayRanks(
        usersRank,
        guildsRoleplay,
        message,
        StateManager
      );
      //Embed Nuevo nivel Rol
      let levelupEmbed = new MessageEmbed()
        .setThumbnail(message.author.displayAvatarURL())
        .setTitle(`**Nivel Alcanzado** ${emojiLevelUp}`)
        .setColor(noneColor)
        .addField(
          "**Nuevo nivel desbloqueado**",
          `Nivel de rol **${newLevel}**`
        );
      if (
        memberLevel !== 3 ||
        memberLevel !== 6 ||
        memberLevel !== 9 ||
        memberLevel !== 12 ||
        memberLevel !== 12
      ) {
        //Agregación al Mensaje Embed
        levelupEmbed.addField(
          `Recompensa de Nivel ${emojiRewardBag}`,
          "☄ **Xp** de Servidor + " +
            `${xpReward}xp.\n${emojiSynkoin} **Synkoins** ganadas: ${coinsReward}sk.`
        );
        //Comprobación nuevo Nivel Usuario
        let memberXPUpdate = parseInt(ObjectMember.memberXP) + xpReward;
        let memberLevelUpdate = parseInt(ObjectMember.memberLevel);
        const newMemberLevel = limitLevel(
          memberXPUpdate,
          parseInt(ObjectMember.memberLevel)
        );
        //Validación subida de Nivel
        if (newMemberLevel > parseInt(ObjectMember.memberLevel)) {
          const levelUpMemberEmbed = new MessageEmbed()
            .setAuthor(message.author.username, bot.user.displayAvatarURL())
            .setTitle(`**Nivel Alcanzado** ${emojiLevelUp}`)
            .setColor(cleverColor)
            .setThumbnail(message.author.displayAvatarURL())
            .addField(
              "**Usuario Iluminado**",
              `<@${message.author.id}> alcanzó un nuevo **Nivel**.`
            )
            .addField(
              "**Nivel Alcanzado**",
              `Nuevo nivel **${ObjectMember.memberLevel}**`
            )
            .setFooter("Estadísticas de niveles Internacional de Synchronous")
            .setTimestamp();
          memberLevelUpdate = newMemberLevel;
          levelChannel.send(levelUpMemberEmbed);
        }
        //Actualización Base de Datos Member XP - Level
        const updateMemberXP = await updateGuildMemberXP(
          guildID,
          memberID,
          memberXPUpdate,
          memberLevelUpdate
        );
        StateManager.emit(
          "updateMemberXP",
          guildID,
          memberID,
          memberXPUpdate,
          memberLevelUpdate
        );
        ObjectMember.memberLevel = memberLevelUpdate;
        ObjectMember.memberXP = memberXPUpdate;
        //Actualización Base de Datos Bank Coins
        const updateMemberCoins = await updateGuildBankCoins(
          guildID,
          memberID,
          parseInt(ObjectBankMember.memberCoins) + coinsReward
        );
        StateManager.emit(
          "updateCoins",
          guildID,
          memberID,
          parseInt(ObjectBankMember.memberCoins) + coinsReward
        );
        ObjectBankMember.memberCoins =
          parseInt(ObjectBankMember.memberCoins) + coinsReward;
      }
      if (memberLevel === 3) {
        //Boostime Reward
        if (boostMemberTime === 0) {
          const updateMemberBoost = await updateGuildMemberBoost(
            guildID,
            memberID,
            10,
            boostTimeBase
          );
          StateManager.emit(
            "updateMemberBoost",
            guildID,
            memberID,
            10,
            boostTimeBase
          );
          ObjectMember.memberBoost = 10;
          boostMemberTime = boostTimeBase;
          addBoost = `\n${emojiBoostB} **Boost** de xp en Servidor: **x10**.`;
        }
        //Agregación al Mensaje Embed
        levelupEmbed.addField(
          `Recompensa de Nivel ${emojiRewardBag}`,
          "📜 **Nuevo** comando desbloqueado: `try or try <user>`.\n☄ **Xp** de Servidor + " +
            `${xpReward}xp.\n${emojiSynkoin} **Synkoins** ganadas: ${coinsReward}sk.` +
            addBoost
        );
        //Comprobación nuevo Nivel Usuario
        let memberXPUpdate = parseInt(ObjectMember.memberXP) + xpReward;
        let memberLevelUpdate = parseInt(ObjectMember.memberLevel);
        const newMemberLevel = limitLevel(
          memberXPUpdate,
          parseInt(ObjectMember.memberLevel)
        );
        //Validación subida de Nivel
        if (newMemberLevel > parseInt(ObjectMember.memberLevel)) {
          const levelUpMemberEmbed = new MessageEmbed()
            .setAuthor(message.author.username, bot.user.displayAvatarURL())
            .setTitle(`**Nivel Alcanzado** ${emojiLevelUp}`)
            .setColor(cleverColor)
            .setThumbnail(message.author.displayAvatarURL())
            .addField(
              "**Usuario Iluminado**",
              `<@${message.author.id}> alcanzó un nuevo **Nivel**.`
            )
            .addField(
              "**Nivel Alcanzado**",
              `Nuevo nivel **${ObjectMember.memberLevel}**`
            )
            .setFooter("Estadísticas de niveles Internacional de Synchronous")
            .setTimestamp();
          memberLevelUpdate = newMemberLevel;
          levelChannel.send(levelUpMemberEmbed);
        }
        //Actualización Base de Datos Member XP - Level
        const updateMemberXP = await updateGuildMemberXP(
          guildID,
          memberID,
          memberXPUpdate,
          memberLevelUpdate
        );
        StateManager.emit(
          "updateMemberXP",
          guildID,
          memberID,
          memberXPUpdate,
          memberLevelUpdate
        );
        ObjectMember.memberLevel = memberLevelUpdate;
        ObjectMember.memberXP = memberXPUpdate;
        //Actualización Base de Datos Bank Coins
        const updateMemberCoins = await updateGuildBankCoins(
          guildID,
          memberID,
          parseInt(ObjectBankMember.memberCoins) + coinsReward
        );
        StateManager.emit(
          "updateCoins",
          guildID,
          memberID,
          parseInt(ObjectBankMember.memberCoins) + coinsReward
        );
        ObjectBankMember.memberCoins =
          parseInt(ObjectBankMember.memberCoins) + coinsReward;
      } else if (memberLevel === 6) {
        //Boostime Reward
        if (boostMemberTime === 0) {
          const updateMemberBoost = await updateGuildMemberBoost(
            guildID,
            memberID,
            10,
            boostTimeBase
          );
          StateManager.emit(
            "updateMemberBoost",
            guildID,
            memberID,
            10,
            boostTimeBase
          );
          ObjectMember.memberBoost = 10;
          boostMemberTime = boostTimeBase;
          addBoost = `\n${emojiBoostB} **Boost** de xp en Servidor: **x10**.`;
        }
        //Agregación al Mensaje Embed
        levelupEmbed.addField(
          `Recompensa de Nivel ${emojiRewardBag}`,
          "📜 **Nuevo** comando desbloqueado: `hug <user>`.\n☄ **Xp** de Servidor + " +
            `${xpReward}xp.\n${emojiSynkoin} **Synkoins** ganadas: ${coinsReward}sk.` +
            addBoost
        );
        //Comprobación nuevo Nivel Usuario
        let memberXPUpdate = parseInt(ObjectMember.memberXP) + xpReward;
        let memberLevelUpdate = parseInt(ObjectMember.memberLevel);
        const newMemberLevel = limitLevel(
          memberXPUpdate,
          parseInt(ObjectMember.memberLevel)
        );
        //Validación subida de Nivel
        if (newMemberLevel > ObjectMember.memberLevel) {
          const levelUpMemberEmbed = new MessageEmbed()
            .setAuthor(message.author.username, bot.user.displayAvatarURL())
            .setTitle(`**Nivel Alcanzado** ${emojiLevelUp}`)
            .setColor(cleverColor)
            .setThumbnail(message.author.displayAvatarURL())
            .addField(
              "**Usuario Iluminado**",
              `<@${message.author.id}> alcanzó un nuevo **Nivel**.`
            )
            .addField(
              "**Nivel Alcanzado**",
              `Nuevo nivel **${ObjectMember.memberLevel}**`
            )
            .setFooter("Estadísticas de niveles Internacional de Synchronous")
            .setTimestamp();
          memberLevelUpdate = newMemberLevel;
          levelChannel.send(levelUpMemberEmbed);
        }
        //Actualización Base de Datos Member XP - Level
        const updateMemberXP = await updateGuildMemberXP(
          guildID,
          memberID,
          memberXPUpdate,
          memberLevelUpdate
        );
        StateManager.emit(
          "updateMemberXP",
          guildID,
          memberID,
          memberXPUpdate,
          memberLevelUpdate
        );
        ObjectMember.memberLevel = memberLevelUpdate;
        ObjectMember.memberXP = memberXPUpdate;
        //Actualización Base de Datos Bank Coins
        const updateMemberCoins = await updateGuildBankCoins(
          guildID,
          memberID,
          parseInt(ObjectBankMember.memberCoins) + coinsReward
        );
        StateManager.emit(
          "updateCoins",
          guildID,
          memberID,
          parseInt(ObjectBankMember.memberCoins) + coinsReward
        );
        ObjectBankMember.memberCoins =
          parseInt(ObjectBankMember.memberCoins) + coinsReward;
      } else if (memberLevel === 9) {
        //Boostime Reward
        if (boostMemberTime === 0) {
          const updateMemberBoost = await updateGuildMemberBoost(
            guildID,
            memberID,
            10,
            boostTimeBase
          );
          StateManager.emit(
            "updateMemberBoost",
            guildID,
            memberID,
            10,
            boostTimeBase
          );
          ObjectMember.memberBoost = 10;
          boostMemberTime = boostTimeBase;
          addBoost = `\n${emojiBoostB} **Boost** de xp en Servidor: **x10**.`;
        }
        //Agregación al Mensaje Embed
        levelupEmbed.addField(
          `Recompensa de Nivel ${emojiRewardBag}`,
          "📜 **Nuevo** comando desbloqueado: `kiss <user>`.\n☄ **Xp** de Servidor + " +
            `${xpReward}xp.\n${emojiSynkoin} **Synkoins** ganadas: ${coinsReward}sk.` +
            addBoost
        );
        //Comprobación nuevo Nivel Usuario
        let memberXPUpdate = parseInt(ObjectMember.memberXP) + xpReward;
        let memberLevelUpdate = parseInt(ObjectMember.memberLevel);
        const newMemberLevel = limitLevel(
          memberXPUpdate,
          parseInt(ObjectMember.memberLevel)
        );
        //Validación subida de Nivel
        if (newMemberLevel > parseInt(ObjectMember.memberLevel)) {
          const levelUpMemberEmbed = new MessageEmbed()
            .setAuthor(message.author.username, bot.user.displayAvatarURL())
            .setTitle(`**Nivel Alcanzado** ${emojiLevelUp}`)
            .setColor(cleverColor)
            .setThumbnail(message.author.displayAvatarURL())
            .addField(
              "**Usuario Iluminado**",
              `<@${message.author.id}> alcanzó un nuevo **Nivel**.`
            )
            .addField(
              "**Nivel Alcanzado**",
              `Nuevo nivel **${ObjectMember.memberLevel}**`
            )
            .setFooter("Estadísticas de niveles Internacional de Synchronous")
            .setTimestamp();
          memberLevelUpdate = newMemberLevel;
          levelChannel.send(levelUpMemberEmbed);
        }
        //Actualización Base de Datos Member XP - Level
        const updateMemberXP = await updateGuildMemberXP(
          guildID,
          memberID,
          memberXPUpdate,
          memberLevelUpdate
        );
        StateManager.emit(
          "updateMemberXP",
          guildID,
          memberID,
          memberXPUpdate,
          memberLevelUpdate
        );
        ObjectMember.memberLevel = memberLevelUpdate;
        ObjectMember.memberXP = memberXPUpdate;
        //Actualización Base de Datos Bank Coins
        const updateMemberCoins = await updateGuildBankCoins(
          guildID,
          memberID,
          parseInt(ObjectBankMember.memberCoins) + coinsReward
        );
        StateManager.emit(
          "updateCoins",
          guildID,
          memberID,
          parseInt(ObjectBankMember.memberCoins) + coinsReward
        );
        ObjectBankMember.memberCoins =
          parseInt(ObjectBankMember.memberCoins) + coinsReward;
      } else if (memberLevel === 12) {
        //Boostime Reward
        if (boostMemberTime === 0) {
          const updateMemberBoost = await updateGuildMemberBoost(
            guildID,
            memberID,
            10,
            boostTimeBase
          );
          StateManager.emit(
            "updateMemberBoost",
            guildID,
            memberID,
            10,
            boostTimeBase
          );
          ObjectMember.memberBoost = 10;
          boostMemberTime = boostTimeBase;
          addBoost = `\n${emojiBoostB} **Boost** de xp en Servidor: **x10**.`;
        }
        //Agregación al Mensaje Embed
        levelupEmbed.addField(
          `Recompensa de Nivel ${emojiRewardBag}`,
          "📜 **Nuevo** comando desbloqueado: `pat <user>`.\n☄ **Xp** de Servidor + " +
            `${xpReward}xp.\n${emojiSynkoin} **Synkoins** ganadas: ${coinsReward}sk.` +
            addBoost
        );
        //Comprobación nuevo Nivel Usuario
        let memberXPUpdate = parseInt(ObjectMember.memberXP) + xpReward;
        let memberLevelUpdate = parseInt(ObjectMember.memberLevel);
        const newMemberLevel = limitLevel(
          memberXPUpdate,
          parseInt(ObjectMember.memberLevel)
        );
        //Validación subida de Nivel
        if (newMemberLevel > parseInt(ObjectMember.memberLevel)) {
          const levelUpMemberEmbed = new MessageEmbed()
            .setAuthor(message.author.username, bot.user.displayAvatarURL())
            .setTitle(`**Nivel Alcanzado** ${emojiLevelUp}`)
            .setColor(cleverColor)
            .setThumbnail(message.author.displayAvatarURL())
            .addField(
              "**Usuario Iluminado**",
              `<@${message.author.id}> alcanzó un nuevo **Nivel**.`
            )
            .addField(
              "**Nivel Alcanzado**",
              `Nuevo nivel **${ObjectMember.memberLevel}**`
            )
            .setFooter("Estadísticas de niveles Internacional de Synchronous")
            .setTimestamp();
          memberLevelUpdate = newMemberLevel;
          levelChannel.send(levelUpMemberEmbed);
        }
        //Actualización Base de Datos Member XP - Level
        const updateMemberXP = await updateGuildMemberXP(
          guildID,
          memberID,
          memberXPUpdate,
          memberLevelUpdate
        );
        StateManager.emit(
          "updateMemberXP",
          guildID,
          memberID,
          memberXPUpdate,
          memberLevelUpdate
        );
        ObjectMember.memberLevel = memberLevelUpdate;
        ObjectMember.memberXP = memberXPUpdate;
        //Actualización Base de Datos Bank Coins
        const updateMemberCoins = await updateGuildBankCoins(
          guildID,
          memberID,
          parseInt(ObjectBankMember.memberCoins) + coinsReward
        );
        StateManager.emit(
          "updateCoins",
          guildID,
          memberID,
          parseInt(ObjectBankMember.memberCoins) + coinsReward
        );
        ObjectBankMember.memberCoins =
          parseInt(ObjectBankMember.memberCoins) + coinsReward;
      } else if (memberLevel === 18) {
        //Boostime Reward
        if (boostMemberTime === 0) {
          const updateMemberBoost = await updateGuildMemberBoost(
            guildID,
            memberID,
            10,
            boostTimeBase
          );
          StateManager.emit(
            "updateMemberBoost",
            guildID,
            memberID,
            10,
            boostTimeBase
          );
          ObjectMember.memberBoost = 10;
          boostMemberTime = boostTimeBase;
          addBoost = `\n${emojiBoostB} **Boost** de xp en Servidor: **x10**.`;
        }
        //Agregación al Mensaje Embed
        levelupEmbed.addField(
          `Recompensa de Nivel ${emojiRewardBag}`,
          "📜 **Nuevo** comando desbloqueado: `fuck <user>`.\n☄ **Xp** de Servidor + " +
            `${xpReward}xp.\n${emojiSynkoin} **Synkoins** ganadas: ${coinsReward}sk.` +
            addBoost
        );
        //Comprobación nuevo Nivel Usuario
        let memberXPUpdate = parseInt(ObjectMember.memberXP) + xpReward;
        let memberLevelUpdate = parseInt(ObjectMember.memberLevel);
        const newMemberLevel = limitLevel(
          memberXPUpdate,
          parseInt(ObjectMember.memberLevel)
        );
        //Validación subida de Nivel
        if (newMemberLevel > parseInt(ObjectMember.memberLevel)) {
          const levelUpMemberEmbed = new MessageEmbed()
            .setAuthor(message.author.username, bot.user.displayAvatarURL())
            .setTitle(`**Nivel Alcanzado** ${emojiLevelUp}`)
            .setColor(cleverColor)
            .setThumbnail(message.author.displayAvatarURL())
            .addField(
              "**Usuario Iluminado**",
              `<@${message.author.id}> alcanzó un nuevo **Nivel**.`
            )
            .addField(
              "**Nivel Alcanzado**",
              `Nuevo nivel **${ObjectMember.memberLevel}**`
            )
            .setFooter("Estadísticas de niveles Internacional de Synchronous")
            .setTimestamp();
          memberLevelUpdate = newMemberLevel;
          levelChannel.send(levelUpMemberEmbed);
        }
        //Actualización Base de Datos Member XP - Level
        const updateMemberXP = await updateGuildMemberXP(
          guildID,
          memberID,
          memberXPUpdate,
          memberLevelUpdate
        );
        StateManager.emit(
          "updateMemberXP",
          guildID,
          memberID,
          memberXPUpdate,
          memberLevelUpdate
        );
        ObjectMember.memberLevel = memberLevelUpdate;
        ObjectMember.memberXP = memberXPUpdate;
        //Actualización Base de Datos Bank Coins
        const updateMemberCoins = await updateGuildBankCoins(
          guildID,
          memberID,
          parseInt(ObjectBankMember.memberCoins) + coinsReward
        );
        StateManager.emit(
          "updateCoins",
          guildID,
          memberID,
          parseInt(ObjectBankMember.memberCoins) + coinsReward
        );
        ObjectBankMember.memberCoins =
          parseInt(ObjectBankMember.memberCoins) + coinsReward;
      }
      //Agregación de Tipo de Conector y Nombre de Error
      levelupEmbed.addFields(
        {
          name: "CONECTOR",
          value: `[REWARD]`,
          inline: true,
        },
        {
          name: "NOMBRE DE REWARD",
          value: "`rewardsRolePlay(bot,message)`",
          inline: true,
        }
      );
      message.channel.send(levelupEmbed);
    } else {
      //Actualización Base de Datos Roleplay XP - Rank
      const updateRolePlayMemberXP = await updateGuildRolePlayMemberXP(
        guildID,
        memberID,
        updateXP,
        newLevel
      );
      StateManager.emit(
        "updateRolePlayMemberXP",
        guildID,
        memberID,
        updateXP,
        newLevel
      );
      memberXP = updateXP;
      memberLevel = newLevel;
      //Rank RolePlayMembers
      let usersRank = [];
      const updateServerRanks = await sortRolePlayRanks(
        usersRank,
        guildsRoleplay,
        message,
        StateManager
      );
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
  "bankMembersUpdate",
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

StateManager.on("updateCoins", (guildID, memberID, newCoins) => {
  let objectBankMember = null;
  objectBankMember = initObjectMember(
    bankGuilds,
    objectBankMember,
    guildID,
    memberID
  );
  objectBankMember.memberCoins = newCoins;
});

StateManager.on("updateMemberCoins", (guildID, memberID, memberCoins) => {
  let ObjectBankMember = null;
  ObjectBankMember = initObjectMember(
    bankGuilds,
    ObjectBankMember,
    guildID,
    memberID
  );
  ObjectBankMember.memberCoins = memberCoins;
});

StateManager.on("updateAuthorCoins", (guildID, memberID, memberCoins) => {
  let ObjectBankMember = null;
  ObjectBankMember = initObjectMember(
    bankGuilds,
    ObjectBankMember,
    guildID,
    memberID
  );
  ObjectBankMember.memberCoins = memberCoins;
});

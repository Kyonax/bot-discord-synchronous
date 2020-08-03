//Importación especifica de Metodos - RichEmbed - getMember putEmoji Functions - Errors - kyocolor Colors - synkoin Emoji
const { MessageEmbed } = require("discord.js");
const {
  getMember,
  putEmoji,
  initObjectMember,
  numberWithCommas,
} = require("../../utils/misc/functions");
const {
  goldColor,
  cleverColor,
} = require("../../../database/utils/color/color.json");
const {
  updateGuildBankCoins,
  updateGuildMemberBoost,
  updateGuildLevel,
} = require("../../utils/database/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
const { limit } = require("../../utils/logic/logicMember");
//Importación Clase de Objetos - Conector Error
const Error = require("../../../database/conectors/error");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const StateManager = require("../../utils/database/StateManager");
//Mapa de pregijos guildCommandPrefix
const guildMembersBank = new Map();
const bankGuilds = new Map();
//Mapa de Miembros
const guildMembers = new Map();
const guilds = new Map();
//Exportación de Comando Pay
module.exports = class PayCommand extends BaseCommand {
  constructor() {
    super(
      "pay",
      ["sendCoins", "pagar", "psynkoins"],
      "Comando **transferir** dinero o **comprar** cosas de la Tienda.",
      "pay <type>`\n**Tipo:** `user`, `level`, `boost`\n**User:** `<user>` `<amount>`\n**Boost:** `<boost>`",
      "_***Todos***_",
      "store"
    );
  }
  async run(bot, message, args) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    //Inicialización de Variable Usuario
    let autor = getMember(message, message.author.id);
    let member = getMember(message, args[1]);
    const type = args[0];
    //Creación de Mensajes Embed para el Comando
    let embed = new MessageEmbed()
      .setTitle(`**${member.displayName}'s Bank**`)
      .setColor(goldColor)
      .setThumbnail("https://i.imgur.com/OXIkW3Q.png")
      .setFooter("Banco Internacional de Synchronous")
      .setTimestamp();
    //Creación de Objeto Bank Member
    let ObjectBankMember = null;
    let ObjectBankAuthor = null;
    let ObjectAuthor = null;
    ObjectAuthor = initObjectMember(
      guilds,
      ObjectAuthor,
      message.guild.id,
      autor.id
    );
    ObjectBankAuthor = initObjectMember(
      bankGuilds,
      ObjectBankAuthor,
      message.guild.id,
      autor.id
    );
    ObjectBankMember = initObjectMember(
      bankGuilds,
      ObjectBankMember,
      message.guild.id,
      member.id
    );
    if (!ObjectBankMember.memberCoins)
      return err.noFindMemberBank(bot, message);
    if (!isNaN(type)) return err.noTypeFoundPay(bot, message, type);
    //Types
    if (type.toLowerCase() === "user") {
      //Validación de variables - Monedas - Usuario
      if (autor.id === member.id) return err.noValidTargetPay(bot, message);
      if (!parseInt(args[2])) return err.noAmountDigit(bot, message);
      //Inicialización de Variables - Monedas de Usuario - Monedas de Autor
      let actualMemberCoins = parseInt(ObjectBankMember.memberCoins);
      let actualAuthorCoins = parseInt(ObjectBankAuthor.memberCoins);
      const updateMCoins = actualMemberCoins + parseInt(args[2]);
      const updateACoins = actualAuthorCoins - parseInt(args[2]);
      //Validación de Variables - No suficientes Monedas
      if (actualAuthorCoins < args[2])
        return err.dontHaveSynkoins(bot, message, autor.displayName);
      //Transferencia de Monedas - Autor - Usuario
      const updateMemberCoins = await updateGuildBankCoins(
        message.guild.id,
        member.id,
        updateMCoins
      );
      const updateAuthorCoins = await updateGuildBankCoins(
        message.guild.id,
        autor.id,
        updateACoins
      );
      //Update Map
      ObjectBankAuthor.memberCoins = updateACoins;
      ObjectBankMember.memberCoins = updateMCoins;
      //Emit Update
      StateManager.emit(
        "updateMemberCoins",
        message.guild.id,
        member.id,
        updateMCoins
      );
      StateManager.emit(
        "updateAuthorCoins",
        message.guild.id,
        autor.id,
        updateACoins
      );
      //Inicialización de Emojis y su Uso respectivo
      const emoji = putEmoji(bot, synchronous.emojiID[0].synkoin);
      if (message.guild.id != synchronous.guildID) emoji = "💰";
      //Inicialización de Variable Razón de Transferencia
      let reason = "";
      if (args[3]) reason = `, ${args.slice(3).join(" ")}`;
      //Agregación al Embed
      embed.setDescription(
        `<@${autor.id}> ha transferido **Synkoins a** <@${member.id}>${reason}.`
      );
      embed.addField(
        "**Monto de la Transferencia**",
        `**${numberWithCommas(args[2])} ${emoji} Synkoins**`,
        true
      );
      embed.addField(
        `**Fondos Restantes de ${autor.username}**`,
        `**${numberWithCommas(updateACoins)} ${emoji} Synkoins.**`,
        true
      );
    } else if (type.toLowerCase() === "boost") {
      let boostB = 1800;
      let boostA = 3200;
      let boostPremium = 6000;

      let boostBv = 10;
      let boostAv = 50;
      let boostPremiumv = 100;

      let boostTimeBase = 1000;
      let boostTimeAvanzado = 3000;
      let boostPremiumTime = 9000;

      if (!args[1].toLowerCase()) return err.noBoostDigit(bot, message);
      switch (args[1]) {
        case "base":
          break;
        case "avanzado":
          break;
        case "premium":
          break;
        default:
          err.noBoostFound(bot, member);
      }

      if (args[1] === "base") {
        let actualAuthorCoins = parseInt(ObjectBankAuthor.memberCoins);
        //Validación de Variables - No suficientes Monedas
        if (actualAuthorCoins < boostB)
          return err.dontHaveSynkoins(bot, message, autor.displayName);
        const updateMemberBoost = updateGuildMemberBoost(
          message.guild.id,
          autor.id,
          boostBv,
          boostTimeBase
        );
        StateManager.emit(
          "updateMemberBoost",
          message.guild.id,
          autor.id,
          boostBv,
          boostTimeBase
        );
        ObjectAuthor.boostMemberTime = boostTimeBase;
        ObjectAuthor.memberBoost = boostBv;
        //Coins
        const updateACoins = actualAuthorCoins - boostB;
        const updateAuthorCoins = await updateGuildBankCoins(
          message.guild.id,
          autor.id,
          updateACoins
        );
        //Update Map
        ObjectBankAuthor.memberCoins = updateACoins;
        //Emit Update
        StateManager.emit(
          "updateAuthorCoins",
          message.guild.id,
          autor.id,
          updateACoins
        );
        //Emojis
        //Inicialización de Emojis y su Uso respectivo
        const emojiBoostB = putEmoji(bot, synchronous.emojiID[0].boostb);
        if (message.guild.id != synchronous.guildID) emojiBoostB = "🔰";
        //Inicialización de Emojis y su Uso respectivo
        const emojiSynkoins = putEmoji(bot, synchronous.emojiID[0].synkoin);
        if (message.guild.id != synchronous.guildID) emojiSynkoins = "💰";
        //Mensaje Embed
        embed.addField(
          "**Boost Canjeado**",
          `<@${autor.id}> ha canjeado el **Boost Base** ${emojiBoostB} de experiencia`
        );
        embed.addField(
          "**Dinero Canjeado**",
          `**${numberWithCommas(boostB)}** ${emojiSynkoins} **Synkoins.**`
        );
        embed.addField(
          `**Fondos Restantes de ${autor.displayName}**`,
          `**${numberWithCommas(updateACoins)} ${emojiSynkoins} Synkoins.**`,
          true
        );
      } else if (args[1] === "avanzado") {
        let actualAuthorCoins = parseInt(ObjectBankAuthor.memberCoins);
        //Validación de Variables - No suficientes Monedas
        if (actualAuthorCoins < boostA)
          return err.dontHaveSynkoins(bot, message, autor.displayName);
        const updateMemberBoost = updateGuildMemberBoost(
          message.guild.id,
          autor.id,
          boostAv,
          boostTimeAvanzado
        );
        StateManager.emit(
          "updateMemberBoost",
          message.guild.id,
          autor.id,
          boostAv,
          boostTimeAvanzado
        );
        ObjectAuthor.boostMemberTime = boostTimeAvanzado;
        ObjectAuthor.memberBoost = boostAv;
        //Coins
        const updateACoins = actualAuthorCoins - boostA;
        const updateAuthorCoins = await updateGuildBankCoins(
          message.guild.id,
          autor.id,
          updateACoins
        );
        //Update Map
        ObjectBankAuthor.memberCoins = updateACoins;
        //Emit Update
        StateManager.emit(
          "updateAuthorCoins",
          message.guild.id,
          autor.id,
          updateACoins
        );
        //Emojis
        //Inicialización de Emojis y su Uso respectivo
        const emojiBoostA = putEmoji(bot, synchronous.emojiID[0].boosta);
        if (message.guild.id != synchronous.guildID) emojiBoostA = "🔰";
        //Inicialización de Emojis y su Uso respectivo
        const emojiSynkoins = putEmoji(bot, synchronous.emojiID[0].synkoin);
        if (message.guild.id != synchronous.guildID) emojiSynkoins = "💰";
        //Mensaje Embed
        embed.addField(
          "**Boost Canjeado**",
          `<@${autor.id}> ha canjeado el **Boost Avanzado** ${emojiBoostA} de experiencia`
        );
        embed.addField(
          "**Dinero Canjeado**",
          `**${numberWithCommas(boostA)}** ${emojiSynkoins} **Synkoins**`
        );
        embed.addField(
          `**Fondos Restantes de ${autor.displayName}**`,
          `**${numberWithCommas(updateACoins)} ${emojiSynkoins} Synkoins.**`,
          true
        );
      } else if (args[1] === "premium") {
        let actualAuthorCoins = parseInt(ObjectBankAuthor.memberCoins);
        //Validación de Variables - No suficientes Monedas
        if (actualAuthorCoins < boostPremium)
          return err.dontHaveSynkoins(bot, message, autor.displayName);
        const updateMemberBoost = updateGuildMemberBoost(
          message.guild.id,
          autor.id,
          boostPremiumv,
          boostPremiumTime
        );
        StateManager.emit(
          "updateMemberBoost",
          message.guild.id,
          autor.id,
          boostPremiumv,
          boostPremiumTime
        );
        ObjectAuthor.boostMemberTime = boostPremiumTime;
        ObjectAuthor.memberBoost = boostPremiumv;
        //Coins
        const updateACoins = actualAuthorCoins - boostPremium;
        const updateAuthorCoins = await updateGuildBankCoins(
          message.guild.id,
          autor.id,
          updateACoins
        );
        //Update Map
        ObjectBankAuthor.memberCoins = updateACoins;
        //Emit Update
        StateManager.emit(
          "updateAuthorCoins",
          message.guild.id,
          autor.id,
          updateACoins
        );
        //Emojis
        //Inicialización de Emojis y su Uso respectivo
        const emojiBoostPremium = putEmoji(bot, synchronous.emojiID[0].boostp);
        if (message.guild.id != synchronous.guildID) emojiBoostPremium = "🔰";
        //Inicialización de Emojis y su Uso respectivo
        const emojiSynkoins = putEmoji(bot, synchronous.emojiID[0].synkoin);
        if (message.guild.id != synchronous.guildID) emojiSynkoins = "💰";
        //Mensaje Embed
        embed.addField(
          "**Boost Canjeado**",
          `<@${autor.id}> ha canjeado el **Boost Premium** ${emojiBoostPremium} de experiencia`
        );
        embed.addField(
          "**Dinero Canjeado**",
          `**${numberWithCommas(
            boostPremium
          )}** ${emojiSynkoins} **Synkoins.**`,
          true
        );
        embed.addField(
          `**Fondos Restantes de ${autor.displayName}**`,
          `**${numberWithCommas(updateACoins)} ${emojiSynkoins} Synkoins.**`,
          true
        );
      }
    } else if (args[0] === "level") {
      let actualAuthorCoins = parseInt(ObjectBankAuthor.memberCoins);
      let actualAuthorLevel = parseInt(ObjectAuthor.memberLevel);
      let actualAuthorXP = parseInt(ObjectAuthor.memberXP);
      const basePrice = Math.floor(
        actualAuthorLevel * 9000 + actualAuthorXP / 9
      );
      //Validación de Variables - No suficientes Monedas
      if (actualAuthorCoins < basePrice)
        return err.dontHaveSynkoins(bot, message, autor.displayName);
      const limitAuthorXP = limit(actualAuthorXP, actualAuthorLevel);
      const boughtXP = limitAuthorXP - actualAuthorXP;
      actualAuthorLevel++;
      const updateMemberLevel = updateGuildLevel(
        message.guild.id,
        autor.id,
        actualAuthorLevel,
        boughtXP
      );
      StateManager.emit(
        "updateMemberLevel",
        message.guild.id,
        autor.id,
        actualAuthorLevel,
        boughtXP
      );
      ObjectAuthor.memberLevel = actualAuthorLevel;
      ObjectAuthor.memberXP = boughtXP;
      //Coins
      const updateACoins = actualAuthorCoins - basePrice;
      const updateAuthorCoins = await updateGuildBankCoins(
        message.guild.id,
        autor.id,
        updateACoins
      );
      //Update Map
      ObjectBankAuthor.memberCoins = updateACoins;
      //Emit Update
      StateManager.emit(
        "updateAuthorCoins",
        message.guild.id,
        autor.id,
        updateACoins
      );
      //Emojis
      const levelChannel = message.guild.channels.cache.find(
        (ch) => ch.name === "💠-niveles-levels"
      );
      //Inicialización de Emojis y su Uso respectivo
      const emojiLevelUp = putEmoji(bot, synchronous.emojiID[0].levelup);
      if (message.guild.id != synchronous.guildID) emojiLevelUp = "💠";
      //Inicialización de Emojis y su Uso respectivo
      const emojiSynkoins = putEmoji(bot, synchronous.emojiID[0].synkoin);
      if (message.guild.id != synchronous.guildID) emojiSynkoins = "💰";
      //Mensaje Embed Level
      const levelUpEmbed = new MessageEmbed()
        .setTitle(`**Nivel Alcanzado** ${emojiLevelUp}`)
        .setAuthor(message.author.username, bot.user.displayAvatarURL())
        .setColor(cleverColor)
        .setThumbnail(message.author.displayAvatarURL())
        .addField(
          "**Usuario Iluminado**",
          `<@${message.author.id}> alcanzó un nuevo **Nivel**.`
        )
        .addField("**Nivel Alcanzado**", `Nuevo nivel **${actualAuthorLevel}**`)
        .setFooter("Estadísticas de niveles Internacional de Synchronous")
        .setTimestamp();
      //Mensaje Embed
      embed.addField(
        "**Boost Canjeado**",
        `<@${autor.id}> ha canjeado un **Nuevo Nivel** ${emojiLevelUp}.`
      );
      embed.addField(
        "**Dinero Canjeado**",
        `**${numberWithCommas(basePrice)}** ${emojiSynkoins} **Synkoins.**`,
        true
      );
      embed.addField(
        `**Fondos Restantes de ${autor.displayName}**`,
        `**${numberWithCommas(updateACoins)} ${emojiSynkoins} Synkoins.**`,
        true
      );
      levelChannel.send(levelUpEmbed);
    }
    //Envio de Mensaje Embed al canal en el que se uso el Comando
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 30000, reason: "It had to be done." });
    });
  }
};

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

StateManager.on("updateAdminMember", (guildID, memberID, adminMember) => {
  let ObjectMember = null;
  ObjectMember = initObjectMember(guilds, ObjectMember, guildID, memberID);
  ObjectMember.adminMember = adminMember;
});

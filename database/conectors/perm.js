//Importación especifica de Metodos - MessageEmbed - kyoColor Color - putEmoji Function
const { MessageEmbed } = require("discord.js");
const { kyoColor } = require("../utils/color/color.json");
const { putEmoji } = require("../../src/utils/misc/functions");
const { synchronous } = require("../utils/emojis/emojis.json");
//Importacion del Cuerpo de un Conector
const BaseConector = require("../../src/utils/structure/BaseConector");
//Exportación de Avisos de Permisos
module.exports = class ErrorConector extends BaseConector {
  constructor() {
    super("perm");
  }
  //Falta de Permisos Owner
  async ownerPerms(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables Emoji - MessageEmbed
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Permisos no Suficientes** ${putEmoji(bot, emoji)}`,
        `Necesitas ser el **Dueño** de la Guild para **poder cambiar el Prefix**.`,
        false
      );
    } else {
      embed.addField(
        `**Permisos no Suficientes** ❌`,
        `Necesitas ser el **Dueño** de la Guild para **poder cambiar el Prefix**.`,
        false
      );
    }
    //Agregación de Tipo de Conector y Nombre de Error
    embed.addFields(
      {
        name: "CONECTOR",
        value: `[${this.name.toUpperCase()}]`,
        inline: true,
      },
      {
        name: "TIPO DE PERMISO",
        value: "`ownerPerms(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }
  //Falta de Permisos Synks
  async synksPerms(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables Emoji - MessageEmbed
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Permisos no Suficientes** ${putEmoji(bot, emoji)}`,
        `Necesitas ser un **Pilar** de la Guild para **poder usar este Comando**.`,
        false
      );
    } else {
      embed.addField(
        `**Permisos no Suficientes** ❌`,
        `Necesitas ser un **Pilar** de la Guild para **poder usar este Comando**.`,
        false
      );
    }
    //Agregación de Tipo de Conector y Nombre de Error
    embed.addFields(
      {
        name: "CONECTOR",
        value: `[${this.name.toUpperCase()}]`,
        inline: true,
      },
      {
        name: "TIPO DE PERMISO",
        value: "`synksPerms(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }
  //Faltan permisos de Inmortal
  async inmortalPerms(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables Emoji - MessageEmbed
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Permisos no Suficientes** ${putEmoji(bot, emoji)}`,
        `Necesitas ser **Inmortal** para poder **usar este Comando**.`,
        false
      );
    } else {
      embed.addField(
        `**Permisos no Suficientes** ❌`,
        `Necesitas ser **Inmortal** para poder **usar este Comando**.`,
        false
      );
    }
    //Agregación de Tipo de Conector y Nombre de Error
    embed.addFields(
      {
        name: "CONECTOR",
        value: `[${this.name.toUpperCase()}]`,
        inline: true,
      },
      {
        name: "TIPO DE PERMISO",
        value: "`inmortalPerms(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }
  //Faltan permisos de Moderador
  async moderatorPerms(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables Emoji - MessageEmbed
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Permisos no Suficientes** ${putEmoji(bot, emoji)}`,
        `Necesitas ser **Moderador** para poder **usar este Comando**.`,
        false
      );
    } else {
      embed.addField(
        `**Permisos no Suficientes** ❌`,
        `Necesitas ser **Moderador** para poder **usar este Comando**.`,
        false
      );
    }
    //Agregación de Tipo de Conector y Nombre de Error
    embed.addFields(
      {
        name: "CONECTOR",
        value: `[${this.name.toUpperCase()}]`,
        inline: true,
      },
      {
        name: "TIPO DE PERMISO",
        value: "`moderatorPerms(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Faltan permisos de notRoleLevel
  async notRoleLevel(bot, message,level) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables Emoji - MessageEmbed
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Permisos no Suficientes** ${putEmoji(bot, emoji)}`,
        `Necesitas tener **Nivel ${level}** de rol para poder **usar este Comando**.`,
        false
      );
    } else {
      embed.addField(
        `**Permisos no Suficientes** ❌`,
        `Necesitas tener **Nivel ${level}** para poder **usar este Comando**.`,
        false
      );
    }
    //Agregación de Tipo de Conector y Nombre de Error
    embed.addFields(
      {
        name: "CONECTOR",
        value: `[${this.name.toUpperCase()}]`,
        inline: true,
      },
      {
        name: "TIPO DE PERMISO",
        value: "`notRoleLevel(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Faltan permisos de Moderador
  async cantCatchSynks(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables Emoji - MessageEmbed
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Permisos no Suficientes** ${putEmoji(bot, emoji)}`,
        `No se puede **usar este Comando** en los **Pilares**.`,
        false
      );
    } else {
      embed.addField(
        `**Permisos no Suficientes** ❌`,
        `No se puede **usar este Comando** en los **Pilares**.`,
        false
      );
    }
    //Agregación de Tipo de Conector y Nombre de Error
    embed.addFields(
      {
        name: "CONECTOR",
        value: `[${this.name.toUpperCase()}]`,
        inline: true,
      },
      {
        name: "TIPO DE PERMISO",
        value: "`cantCatchSynks(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }
};

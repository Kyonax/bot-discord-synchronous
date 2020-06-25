//Importación especifica de Metodos - MessageEmbed - kyoColor Color - putEmoji Function
const { MessageEmbed } = require("discord.js");
const { kyoColor } = require("../utils/color/color.json");
const { putEmoji } = require("../../src/utils/misc/functions");
const { synchronous } = require("../utils/emojis/emojis.json");
//Importacion del Cuerpo de un Conector
const BaseConector = require("../../src/utils/structure/BaseConector");
const StateManager = require("../../src/utils/database/StateManager");
//Mapa de pregijos guildCommandPrefix
const guildCommandPrefix = new Map();
//Exportación de Avisos de Errores
module.exports = class ErrorConector extends BaseConector {
  //Constructor del Objeto
  constructor() {
    super("error");
    this.connection = StateManager.connection;
  }
  //Error noCommandOrder Detectado - Prefix Error
  async noCmdOrder(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)}`,
        `No se ha **digitado** una instrucción para el comando.\nUsa ` +
          "**Uso:** `" +
          prefix +
          "prefix <command>`.\n**Comandos:** `<show>`,`<set>`.",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `No se ha **digitado** una instrucción para el comando.\nUsa ` +
          "**Uso:** `" +
          prefix +
          "prefix <command>`.\n**Comandos:** `<show>`,`<set>`.",
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
        name: "NOMBRE DE ERROR",
        value: "`noCmdOrder(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }
  //Error noCommandOrder Detectado - Prefix Error
  async noCmdOrderS(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)}`,
        `No se ha **digitado** una instrucción para el comando.\nUsa ` +
          "**Uso:** `" +
          prefix +
          "set <command>`.\n**Comandos:** `<admin>`,`<inmortal>`,`<mod>`.\n**Values:** `<true>`,`<false>`.",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `No se ha **digitado** una instrucción para el comando.\nUsa ` +
          "**Uso:** `" +
          prefix +
          "set <command>`.\n**Comandos:** `<admin>`,`<inmortal>`,`<mod>`.\n**Values**: `<true>`,`<false>`.",
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
        name: "NOMBRE DE ERROR",
        value: "`noCmdOrder(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noCommandOrder Detectado - Prefix Error
  async noNewPrefix(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `No se ha **digitado** un nuevo prefix para el comando.\nUsa ` +
          "**Uso:** `" +
          prefix +
          "prefix <set> <new_prefix>`.",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `No se ha **digitado** un nuevo prefix para el comando.\nUsa ` +
          "**Uso:** `" +
          prefix +
          "prefix <set> <new_prefix>`.",
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
        name: "NOMBRE DE ERROR",
        value: "`noNewPrefix(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }
  //Error noCorrectArguments
  async noCorrectArguments(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Sólo se **Permite** ingresar números como **párametros**.\nUsa ` +
          "**Uso:** `" +
          prefix +
          "clear <number>`.",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Sólo se **Permite** ingresar números como **párametros**.\nUsa ` +
          "`" +
          prefix +
          "clear <number>`.",
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
        name: "NOMBRE DE ERROR",
        value: "`noCorrectArguments(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noCorrectArgumentsAge
  async noCorrectArgumentsAge(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Sólo se **Permite** ingresar números como **párametros**.\nUsa ` +
          "**Uso:** `" +
          prefix +
          "age <number>`.",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Sólo se **Permite** ingresar números como **párametros**.\nUsa ` +
          "`" +
          prefix +
          "age <number>`.",
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
        name: "NOMBRE DE ERROR",
        value: "`noCorrectArguments(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noCorrectArgumentsBio
  async noCorrectArgumentsBio(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `No se **Permite** ingresar a un miembro en tu **Biografía**.\nUsa ` +
          "**Uso:** `" +
          prefix +
          "biography <text>`.",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Sólo se **Permite** ingresar números como **párametros**.\nUsa ` +
          "`" +
          prefix +
          "age <number>`.",
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
        name: "NOMBRE DE ERROR",
        value: "`noCorrectArguments(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noCorrectArgumentsWork
  async noCorrectArgumentsWork(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `No se **Permite** ingresar a un miembro en tu **Trabajo**.\nUsa ` +
          "**Uso:** `" +
          prefix +
          "work <nameWork>`.",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `No se **Permite** ingresar a un miembro en tu **Trabajo**.\nUsa ` +
          "**Uso:** `" +
          prefix +
          "work <nameWork>`.",
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
        name: "NOMBRE DE ERROR",
        value: "`noCorrectArguments(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error masoUserNotFound
  async masoUserNotFound(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `No se ha **digitado** un usuario para poder **Ejecutar el Comando**\n` +
          "Digite correctamente el **comando**:`" +
          prefix +
          "shhh <genre> <user>`\n**Género:** `<female>`,`<male>`\n**Opciones:** `<first_user>` `<second_user>`",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `No se ha **digitado** un usuario para poder **Ejecutar el Comando**\n` +
          "Digite correctamente el **comando**:`" +
          prefix +
          "shhh <genre> <user>`\n**Género:** `<female>`,`<male>`\n**Opciones:** `<first_user>` `<second_user>`",
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
        name: "NOMBRE DE ERROR",
        value: "`masoUserNotFound(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }
  //Error genreNotDigit
  async genreNotDigit(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `No se ha **digitado** un género de dominación para **Ejecutar el Comando**\n` +
          "Digite correctamente el **comando**:`" +
          prefix +
          "shhh <genre> <user>`\n**Género:** `<female>`,`<male>`\n**Opciones:** `<first_user>` `<second_user>`",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `No se ha **digitado** un género de dominación para **Ejecutar el Comando**\n` +
          "Digite correctamente el **comando**:`" +
          prefix +
          "shhh <genre> <user>`\n**Género:** `<female>`,`<male>`\n**Opciones:** `<first_user>` `<second_user>`",
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
        name: "NOMBRE DE ERROR",
        value: "`genreNotDigit(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }
  //Error dontHaveSynkoins
  async dontHaveSynkoins(bot, message, username) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Base de Datos** ${putEmoji(bot, emoji)} `,
        `El usuario **${username}** no tiene suficientes **Synkoins en la Base de Datos**.`,
        false
      );
    } else {
      embed.addField(
        `**Error de Base de Datos** ❌`,
        `El usuario **${username}** no tiene suficientes **Synkoins en la Base de Datos**.`,
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
        name: "NOMBRE DE ERROR",
        value: "`dontHaveSynkoins(bot,message,username)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noFindMember
  async noFindMember(bot, message, username) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Base de Datos** ${putEmoji(bot, emoji)} `,
        `El usuario **${username}** no está registrado en **la Base de Datos**.`,
        false
      );
    } else {
      embed.addField(
        `**Error de Base de Datos** ❌`,
        `El usuario **${username}** no está registrado en **la Base de Datos**.`,
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
        name: "NOMBRE DE ERROR",
        value: "`noFindMember(bot,message,username)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noAmountDigit
  async noAmountDigit(bot, message, username) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Debe digitar una **Cantidad de Synkoins** para poder hacer la transferencia.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "pay user <user> <amount>`.",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Debe digitar una **Cantidad de Synkoins** para poder hacer la transferencia.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "pay user <user> <amount>`.",
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
        name: "NOMBRE DE ERROR",
        value: "`noAmountDigit(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }
  //Error shortQuestion
  async shortQuestion(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Debes **realizar** una pregunta más larga.\nUsa ` +
          "**Uso:** `" +
          prefix +
          "8ball <question>`.",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Debes **realizar** una pregunta más larga.\nUsa ` +
          "**Uso:** `" +
          prefix +
          "8ball <question>`.",
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
        name: "NOMBRE DE ERROR",
        value: "`shortQuestion(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }
  //Error fetchCrash
  async fetchCrash(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables emojiObject Map - Embed
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Api** ${putEmoji(bot, emoji)} `,
        `No se pudo **generar la imagen**.`,
        false
      );
    } else {
      embed.addField(
        `**Error de Api** ❌`,
        `No se pudo **generar la imagen**.`,
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
        name: "NOMBRE DE ERROR",
        value: "`fetchCrash(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error dmCrash
  async dmCrash(bot, message, user) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables emojiObject Map - Embed
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Usuario** ${putEmoji(bot, emoji)} `,
        `No se pude **enviar mensajes internos a ${user}**\nEsto puede deberse a que el **Usuario tenga desactivado** el envío de mensajes internos.`,
        false
      );
    } else {
      embed.addField(
        `**Error de Usuario** ❌`,
        `No se pude **enviar mensajes internos a ${user}**\nEsto puede deberse a que el **Usuario tenga desactivado** el envío de mensajes internos.`,
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
        name: "NOMBRE DE ERROR",
        value: "`dmCrash(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 240000, reason: "It had to be done." });
    });
  }

  //Error dmCrash
  async dmCrashWelcome(bot, user, channel) {
    //Inicialización de Variables emojiObject Map - Embed
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    embed.addField(
      `**Error de Usuario** ${putEmoji(bot, emoji)} `,
      `No se pude **enviar mensajes internos a ${user}**\nEsto puede deberse a que el **Usuario tenga desactivado** el envío de mensajes internos.`,
      false
    );

    //Agregación de Tipo de Conector y Nombre de Error
    embed.addFields(
      {
        name: "CONECTOR",
        value: `[${this.name.toUpperCase()}]`,
        inline: true,
      },
      {
        name: "NOMBRE DE ERROR",
        value: "`dmCrash(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    channel.send(embed).then((msg) => {
      msg.delete({ timeout: 240000, reason: "It had to be done." });
    });
  }

  //Error noUserFound
  async noUserFound(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables - emojiObject Map - Embed
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Api** ${putEmoji(bot, emoji)} `,
        `No se **encontró ese Usuario** en la Base de Datos.`,
        false
      );
    } else {
      embed.addField(
        `**Error de Api** ❌`,
        `No se **encontró ese Usuario** en la Base de Datos.`,
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
        name: "NOMBRE DE ERROR",
        value: "`noUserFound(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noBoostFound
  async noBoostFound(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables - emojiObject Map - Embed
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Api** ${putEmoji(bot, emoji)} `,
        `No se **encontró ese Boost** en la Base de Datos.`,
        false
      );
    } else {
      embed.addField(
        `**Error de Api** ❌`,
        `No se **encontró ese Boost** en la Base de Datos.`,
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
        name: "NOMBRE DE ERROR",
        value: "`noBoostFound(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noUserDigit
  async noUserDigit(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Debe digitar un **Usuario** para realizar la busqueda.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "apex <platform> <username_apex>`.\n**Plataformas:** `<pc>`,`<xbox>`,`<psn>`.",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Debe digitar un **Usuario** para realizar la busqueda.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "apex <platform> <username_apex>`.\n**Plataformas:** `<pc>`,`<xbox>`,`<psn>`.",
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
        name: "NOMBRE DE ERROR",
        value: "`noUserDigit(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noUserDigitRep
  async noUserDigitRep(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Debe digitar un **Usuario** para otorgar Respetos.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "rep <user>`",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Debe digitar un **Usuario** para otorgar Respetos.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "rep <user>`",
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
        name: "NOMBRE DE ERROR",
        value: "`noUserDigit(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noUserDigitKick
  async noUserDigitKick(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Debe digitar un **Usuario** para kickear.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "kick <user> <reason>`",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Debe digitar un **Usuario** para kickear.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "kick <user> <reason>`",
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
        name: "NOMBRE DE ERROR",
        value: "`noUserDigit(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noUserDigitBondage
  async noUserDigitBondage(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Debe digitar un **Usuario** para mutear.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "bondage <user> <time>`",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Debe digitar un **Usuario** para mutear.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "bondage <user> <time>`",
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
        name: "NOMBRE DE ERROR",
        value: "`noUserDigit(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noUserDigitBan
  async noUserDigitBan(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Debe digitar un **Usuario** para poder banear.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "ban <user> <reason>`",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Debe digitar un **Usuario** para poder banear.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "ban <user> <reason>`",
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
        name: "NOMBRE DE ERROR",
        value: "`noUserDigit(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noUserDigitWarn
  async noUserDigitWarn(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Debe digitar un **Usuario** para poder darle warn.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "warn <user> <reason>`",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Debe digitar un **Usuario** para poder darle warn.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "warn <user> <reason>`",
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
        name: "NOMBRE DE ERROR",
        value: "`noUserDigit(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noUserDigitARole
  async noUserDigitARole(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Debe digitar un **Usuario** para agregar el rol.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "addrole <user> <@rol>`",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Debe digitar un **Usuario** para agregar el rol.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "addrole <user> <@rol>`",
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
        name: "NOMBRE DE ERROR",
        value: "`noUserDigit(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noUserDigitRRole
  async noUserDigitRRole(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Debe digitar un **Usuario** para quitar el rol.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "removerole <user> <@rol>`",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Debe digitar un **Usuario** para quitar el rol.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "removerole <user> <@rol>`",
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
        name: "NOMBRE DE ERROR",
        value: "`noUserDigit(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noARoleDigit
  async noARoleDigit(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Debe digitar un **Rol** para poder otorgarlo al Usuario.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "addrole <user> <@rol>`",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Debe digitar un **Rol** para poder otorgarlo al Usuario.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "addrole <user> <@rol>`",
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
        name: "NOMBRE DE ERROR",
        value: "`noRoleDigit(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noRRoleDigit
  async noRRoleDigit(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Debe digitar un **Rol** para poder delegarlo al Usuario.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "removerole <user> <@rol>`",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Debe digitar un **Rol** para poder delegarlo al Usuario.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "removerole <user> <@rol>`",
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
        name: "NOMBRE DE ERROR",
        value: "`noRoleDigit(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noRoleFound
  async noRoleFound(bot, message, rolName) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Guild** ${putEmoji(bot, emoji)} `,
        `El rol **${rolName} No está registrado** en la Guild como Rol.`,
        false
      );
    } else {
      embed.addField(
        `**Error de Guild** ❌`,
        `El rol **${rolName} No está registrado** en la Guild como Rol.`,
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
        name: "NOMBRE DE ERROR",
        value: "`noRoleFound(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error roleUnavaible
  async roleUnavaible(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Inmortal Object** ${putEmoji(bot, emoji)} `,
        `Este **Rol** no se puede agregar ni quitar.`,
        false
      );
    } else {
      embed.addField(
        `**Inmortal Object** ❌`,
        `Este **Rol** no se puede agregar ni quitar.`,
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
        name: "NOMBRE DE ERROR",
        value: "`roleUnavaible(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noUserDigitSet
  async noUserDigitSet(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Debe digitar un **Usuario** para actualizar en la base de datos.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "set <command> <value>`.\n**Comandos:** `<admin>`,`<inmortal>`,`<mod>`.\nValues: `<true>`,`<false>`.",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Debe digitar un **Usuario** para actualizar en la base de datos.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "set <command> <value>`.\n**Comandos:** `<admin>`,`<inmortal>`,`<mod>`.\nValues: `<true>`,`<false>`.",
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
        name: "NOMBRE DE ERROR",
        value: "`noUserDigit(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noValueDigit
  async noValueDigit(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Debe digitar un **Value** para actualizar en la base de datos.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "set <command> <value>`.\n**Comandos:** `<admin>`,`<inmortal>`,`<mod>`.\nValues: `<true>`,`<false>`.",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Debe digitar un **Value** para actualizar en la base de datos.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "set <command> <value>`.\n**Comandos:** `<admin>`,`<inmortal>`,`<mod>`.\nValues: `<true>`,`<false>`.",
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
        name: "NOMBRE DE ERROR",
        value: "`noValueDigit(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noValidTarget
  async noValidTarget(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `No puedes **Actualizar tus valores** en la base de Datos.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "set <command> <value>`.\n**Comandos:** `<admin>`,`<inmortal>`,`<mod>`.\nValues: `<true>`,`<false>`.",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `No puedes **Actualizar tus valores** en la base de Datos.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "set <command> <value>`.\n**Comandos:** `<admin>`,`<inmortal>`,`<mod>`.\nValues: `<true>`,`<false>`.",
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
        name: "NOMBRE DE ERROR",
        value: "`noValidTarget(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noValidTargetRep
  async noValidTargetRep(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `No te puedes **Dar Respetos** a ti mismo.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "rep <user>`",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `No te puedes **Dar Respetos** a ti mismo.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "rep <user>`",
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
        name: "NOMBRE DE ERROR",
        value: "`noValidTarget(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noValidChannel
  async noValidChannel(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `No puedes **usar este Comando** en un canal que no sea **NSFW**.`,
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `No puedes **usar este Comando** en un canal que no sea **NSFW**.`,
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
        name: "NOMBRE DE ERROR",
        value: "`noValidChannel(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noValidTargetBondage
  async noValidTargetBondage(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `No puedes **Mutearte** a ti mismo.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "bondage <user> <time>`",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `No puedes **Mutearte** a ti mismo.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "bondage <user> <time>`",
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
        name: "NOMBRE DE ERROR",
        value: "`noValidTarget(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noValidTargetBan
  async noValidTargetBan(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `No puedes **Banearte** a ti mismo.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "ban <user> <reason>`.",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `No puedes **Banearte** a ti mismo.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "ban <user> <reason>`.",
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
        name: "NOMBRE DE ERROR",
        value: "`noValidTarget(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noValidTargetWarn
  async noValidTargetWarn(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `No puedes darte **Warn** a ti mismo.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "warn <user> <reason>`.",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `No puedes darte **Warn** a ti mismo.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "warn <user> <reason>`.",
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
        name: "NOMBRE DE ERROR",
        value: "`noValidTarget(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noValidTargetKick
  async noValidTargetKick(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `No puedes **Kickearte** a ti mismo.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "kick <user> <reason>`.",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `No puedes **Kickearte** a ti mismo.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "kick <user> <reason>`.",
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
        name: "NOMBRE DE ERROR",
        value: "`noValidTarget(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noValidTargetLove
  async noValidTargetLove(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `No te puedes **Cuestionar amor** a ti mismo.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "love <user>`.",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `No te puedes **Cuestionar amor** a ti mismo.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "love <user>`.",
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
        name: "NOMBRE DE ERROR",
        value: "`noValidTarget(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noValidTarget
  async noValidTargetPay(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `No puedes **Transferirte Synkoins** a ti mismo.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "pay user <user> <amount>`.",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `No puedes **Transferirte Synkoins** a ti mismo.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "pay user <user> <amount>`.",
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
        name: "NOMBRE DE ERROR",
        value: "`noValidTarget(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noUserDigit
  async noUserDigitS(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Debe digitar un **Usuario** para realizar la busqueda.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "steam <idurl_steam>`.",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Debe digitar un **Usuario** para realizar la busqueda.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "steam <idurl_steam>`.",
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
        name: "NOMBRE DE ERROR",
        value: "`noUserDigit(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noUserDigit
  async noUserDigitF(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Debe digitar un **Usuario** para realizar la busqueda.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "fortnite <username_fortnite>`.",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Debe digitar un **Usuario** para realizar la busqueda.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "fortnite <username_fortnite>`.",
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
        name: "NOMBRE DE ERROR",
        value: "`noUserDigit(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noReasonDigit
  async noReasonDigit(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Debe digitar una **Razón** para poder realizar el Ban.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "ban <user> <reason>`",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Debe digitar una **Razón** para poder realizar el Ban.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "ban <user> <reason>`",
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
        name: "NOMBRE DE ERROR",
        value: "`noReasonDigit(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }
  //Error noTypeDigit
  async noTypeDigit(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Debe digitar un **Tipo** de sugerencia.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "suggestion <type> <text>`\n**Tipo:** `<mta>`, `<server>`",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Debe digitar un **Tipo** de sugerencia.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "suggestion <type> <text>`\n**Tipo:** `<mta>`, `<server>`",
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
        name: "NOMBRE DE ERROR",
        value: "`noTypeDigit(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }
  //Error noTypeDigit
  async noTypeDigitNews(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Debe digitar un **Tipo** de noticia.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "news <type> <text>`\n**Tipo:** `<server_discord>`, `<server_mta>`",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Debe digitar un **Tipo** de noticia.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "news <type> <text>`\n**Tipo:** `<server_discord>`, `<server_mta>`",
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
        name: "NOMBRE DE ERROR",
        value: "`noTypeDigit(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }
  //Error noSuggestionDigit
  async noSuggestionDigit(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Debe digitar una **Sugerencia** para enviarla al staff.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "suggestion <type> <text>`\n**Tipo:** `<mta>`, `<server>`",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Debe digitar una **Sugerencia** para enviarla al staff.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "suggestion <type> <text>`\n**Tipo:** `<mta>`, `<server>`",
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
        name: "NOMBRE DE ERROR",
        value: "`noSuggestionDigit(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }
  //Error noBoostDigit
  async noBoostDigit(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Debe digitar un **Boost** para proceder con el pago.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "pay boost <boost>`\n**Bossts:** `<base>`, `<avanzado>`, `<premium>`",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Debe digitar un **Boost** para proceder con el pago.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "pay boost <boost>`\n**Bossts:** `<base>`, `<avanzado>`, `<premium>`",
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
        name: "NOMBRE DE ERROR",
        value: "`noBoostDigit(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }
  //Error noContentDigit
  async noContentDigit(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Debe digitar un **Contenido** para poder realizar el Intento.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "try <text>`\n**Opciones:** `<user>`",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Debe digitar un **Contenido** para poder realizar el Intento.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "try <text>`\n**Opciones:** `<user>`",
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
        name: "NOMBRE DE ERROR",
        value: "`noContentDigit(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }
  //Error noAgeDigit
  async noAgeDigit(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Debe digitar una **Edad** para poder realizar el cambio en la Base de Datos.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "age <number>`",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Debe digitar una **Edad** para poder realizar el cambio en la Base de Datos.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "age <number>`",
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
        name: "NOMBRE DE ERROR",
        value: "`noAgeDigit(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }
  //Error noReasonDigitWarn
  async noReasonDigitWarn(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Debe digitar una **Razón** para poder realizar el Warn.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "warn <user> <reason>`",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Debe digitar una **Razón** para poder realizar el Warn.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "warn <user> <reason>`",
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
        name: "NOMBRE DE ERROR",
        value: "`noReasonDigit(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }
  //Error noReasonDigitKick
  async noReasonDigitKick(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Debe digitar una **Razón** para poder realizar el Kick.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "kick <user> <reason>`",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Debe digitar una **Razón** para poder realizar el Kick.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "kick <user> <reason>`",
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
        name: "NOMBRE DE ERROR",
        value: "`noReasonDigit(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noTimeDigit
  async noTimeDigit(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Debe digitar el **Tiempo** que durará el Usuario Muteado.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "bondage <user> <time>`",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Debe digitar el **Tiempo** que durará el Usuario Muteado.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "bondage <user> <time>`",
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
        name: "NOMBRE DE ERROR",
        value: "`noReasonDigit(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noChannelFound
  async noChannelFound(bot, message, channel) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Guild** ${putEmoji(bot, emoji)} `,
        `El canal **${channel}** no se encuentra en la Guild.`,
        false
      );
    } else {
      embed.addField(
        `**Error de Guild** ❌`,
        `El canal **${channel}** no se encuentra en la Guild.`,
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
        name: "NOMBRE DE ERROR",
        value: "`noChannelFound(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noTypeFound
  async noTypeFound(bot, message, type) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Guild** ${putEmoji(bot, emoji)} `,
        `La sugerencia de tipo **${type}** no se encuentra registrada.`,
        false
      );
    } else {
      embed.addField(
        `**Error de Guild** ❌`,
        `La sugerencia de tipo **${type}** no se encuentra registrada.`,
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
        name: "NOMBRE DE ERROR",
        value: "`noTypeFound(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error noTypeFound
  async noTypeFoundNews(bot, message, type) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Guild** ${putEmoji(bot, emoji)} `,
        `La noticia de tipo **${type}** no se encuentra registrada.`,
        false
      );
    } else {
      embed.addField(
        `**Error de Guild** ❌`,
        `La noticia de tipo **${type}** no se encuentra registrada.`,
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
        name: "NOMBRE DE ERROR",
        value: "`noTypeFound(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }
  //Error noPlatformDigit
  async noPlatformDigit(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `Debe digitar una **Plataforma** para realizar la busqueda.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "apex <platform> <username_apex>`.\n**Plataformas:** `<pc>`,`<xbox>`,`<psn>`.",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `Debe digitar una **Plataforma** para realizar la busqueda.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "apex <platform> <username_apex>`.\n**Plataformas:** `<pc>`,`<xbox>`,`<psn>`.",
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
        name: "NOMBRE DE ERROR",
        value: "`noPlatformDigit(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }

  //Error wrongPlatform
  async wrongPlatform(bot, message) {
    //Eliminación del Mensaje Enviado
    message.delete().catch((O_o) => {});
    //Inicialización de Variables prefix - emojiObject Map - Embed
    const prefix = guildCommandPrefix.get(message.guild.id);
    const emoji = synchronous.emojiID[0].cancelado;
    let embed = new MessageEmbed().setColor(kyoColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.addField(
        `**Error de Comando** ${putEmoji(bot, emoji)} `,
        `**Plataforma Incorrecta**, digite una plataforma Válida para **efectuar la busqueda**.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "apex <platform> <username_apex>`.\n**Plataformas:** `<pc>`,`<xbox>`,`<psn>`.",
        false
      );
    } else {
      embed.addField(
        `**Error de Comando** ❌`,
        `**Plataforma Incorrecta**, digite una plataforma Válida para **efectuar la busqueda**.\n` +
          "Digite correctamente el **comando**: `" +
          prefix +
          "apex <platform> <username_apex>`.\n**Plataformas:** `<pc>`,`<xbox>`,`<psn>`.",
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
        name: "NOMBRE DE ERROR",
        value: "`wrongPlatform(bot,message)`",
        inline: true,
      }
    );
    //Envío del Mensaje Embed y su autoeliminación en 20seg
    message.channel.send(embed).then((msg) => {
      msg.delete({ timeout: 20000, reason: "It had to be done." });
    });
  }
};

StateManager.on("prefixFetched", (guildID, prefix) => {
  guildCommandPrefix.set(guildID, prefix);
});

StateManager.on("prefixUpdate", (guildID, prefix) => {
  guildCommandPrefix.set(guildID, prefix);
});

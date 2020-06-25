//Importación especifica de Metodos - RichEmbed - Color
const { MessageEmbed } = require("discord.js");
const { noneColor } = require("../../../database/utils/color/color.json");
const { putEmoji, getMember } = require("../../utils/misc/functions");
const {
  updateGuildAdminMember,
  updateGuildInmortalMember,
  updateGuildModeratorMember,
} = require("../../utils/database/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const StateManager = require("../../utils/database/StateManager");
//Exportación del Comando set
module.exports = class PrefixCommand extends BaseCommand {
  //Constructor del Objeto
  constructor() {
    super(
      "set",
      ["colocar", "change"],
      "Comando para **Colocar o Definir** algún valor de **La Base de Datos** del Servidor.",
      "set <command> <user> <value>`\n**Comandos:** `<admin>`,`<inmortal>`,`<mod>`\n**Valores:** `<true>`,`<false>`",
      "_***Owner***_",
      "owner"
    );
    //Conexión con la Base de Datos
    this.connection = StateManager.connection;
  }
  async run(bot, message, args) {
    //Eliminación del mensaje con Comandos
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    //Validación Permisos
    if (message.member.id != message.guild.ownerID)
      return perm.ownerPerms(bot, message);
    //Inicialización de Member
    const emoji = synchronous.emojiID[0].afirmado;
    //Inicialización de Variables cmdName - cmdOrder - member - value - Object Error - emoji Map - emoji ID
    const [cmdName, cmdOrder] = message.content.split(" ");
    const member = getMember(message, args[1]);
    const value = args[2];
    //Validación Orden digitada - Validación de Usuario
    if (!cmdOrder) return err.noCmdOrderS(bot, message);
    if (!member) return err.noUserDigitSet(bot, message);
    if (!value) return err.noValueDigit(bot, message);
    if (member.id === message.author.id) return err.noValidTarget(bot, message);
    //Creación del Embed
    let embed = new MessageEmbed().setColor(noneColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.setTitle(`${putEmoji(bot, emoji)} DataBase - Update`);
    } else {
      embed.setTitle(`✅ DataBase - Update`);
    }
    //cmdOrder desiciones
    if (cmdOrder.toLowerCase() === "admin") {
      if (value === "true") {
        try {
          await updateGuildAdminMember(message.guild.id, member.id, 1);
        } catch (err) {
          console.log(err);
        }
        StateManager.emit("updateAdminMember", message.guild.id, member.id, 1);
        embed.addField(
          `**${member.displayName} AdminMember**`,
          `El usuario ha sido **colocado como Pilar** en este Servidor.\n**Usando** el comando ` +
            "`" +
            cmdName +
            "`."
        );
      } else if (value === "false") {
        try {
          const UpdateAdmin = await updateGuildAdminMember(
            message.guild.id,
            member.id,
            0
          );
        } catch (err) {
          console.log(err);
        }
        StateManager.emit("updateAdminMember", message.guild.id, member.id, 0);
        embed.addField(
          `**${member.displayName} AdminMember**`,
          `El usuario ha sido **relegado del cargo de Pilar** en este Servidor.\n**Usando** el comando ` +
            "`" +
            cmdName +
            "`."
        );
      }
    } else if (cmdOrder.toLowerCase() === "inmortal") {
      if (value === "true") {
        try {
          await updateGuildInmortalMember(message.guild.id, member.id, 1);
        } catch (err) {
          console.log(err);
        }
        StateManager.emit(
          "updateInmortalMember",
          message.guild.id,
          member.id,
          1
        );
        embed.addField(
          `**${member.displayName} InmortalMember**`,
          `El usuario ha sido **colocado como Inmortal** en este Servidor.\n**Usando** el comando ` +
            "`" +
            cmdName +
            "`."
        );
      } else if (value === "false") {
        await updateGuildInmortalMember(message.guild.id, member.id, 0);
        StateManager.emit(
          "updateInmortalMember",
          message.guild.id,
          member.id,
          0
        );
        embed.addField(
          `**${member.displayName} InmortalMember**`,
          `El usuario ha sido **relegado del cargo de Inmortal** en este Servidor.\n**Usando** el comando ` +
            "`" +
            cmdName +
            "`."
        );
      }
    } else if (cmdOrder.toLowerCase() === "mod") {
      if (value === "true") {
        try {
          await updateGuildModeratorMember(message.guild.id, member.id, 1);
        } catch (err) {
          console.log(err);
        }
        StateManager.emit(
          "updateModeratorMember",
          message.guild.id,
          member.id,
          1
        );
        embed.addField(
          `**${member.displayName} ModeratorMember**`,
          `El usuario ha sido **colocado como Moderador** en este Servidor.\n**Usando** el comando ` +
            "`" +
            cmdName +
            "`."
        );
      } else if (value === "false") {
        await updateGuildModeratorMember(message.guild.id, member.id, 0);
        StateManager.emit(
          "updateModeratorMember",
          message.guild.id,
          member.id,
          0
        );
        embed.addField(
          `**${member.displayName} ModeratorMember**`,
          `El usuario ha sido **relegado del cargo de Moderador** en este Servidor.\n**Usando** el comando ` +
            "`" +
            cmdName +
            "`."
        );
      }
    }
    message.channel.send(embed);
  }
};

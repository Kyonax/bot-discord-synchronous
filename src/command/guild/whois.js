//Importación especifica de Metodos - getMember formateDate findUserID - RichEmbed - stripIndents - Perms
const { getMember, formatDate } = require("../../utils/misc/functions");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
//Importación Clase de Objetos - Conector Perms
const Perms = require("../../../database/conectors/perm");
//Importación de Usuario
const { memberExist } = require("../../utils/database/functions");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
//Exportación del Comando Whois
module.exports = class WhoisCommand extends BaseCommand {
  constructor() {
    super(
      "whois",
      ["w", "info", "is"],
      "Comando para **obtener** datos importantes de un **miembro**.",
      "whois`.\n**Opciones:** `<user>`",
      "_***Todos***_",
      "guild"
    );
  }
  async run(bot, message, args) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const perm = new Perms();
    //Miembro existente
    const existMember = (
      await memberExist(message.guild.id, message.author.id)
    )[0];
    //Inicialización de Párametros Member
    const { moderatorMember } = existMember[0];
    //Inicialización de Member
    const member = getMember(message, args.join(" "));
    //Insuficientes Permisos para usar el Comando
    if (moderatorMember === 0) {
      if (member.roles.cache.get("623715872506118154")) {
        return perm.cantCatchSynks(bot, message);
      }
      return perm.moderatorPerms(bot, message);
    }
    //Inicialización de Variables
    const joined = formatDate(member.joinedAt);
    const role =
      member.roles.cache
        .filter((r) => r.id !== message.guild.id)
        .map((r) => r)
        .join(", ") || "none";

    const created = formatDate(member.user.createdAt);
    //Mensaje Embed
    const embed = new MessageEmbed()
      .setFooter(member.displayName, member.user.displayAvatarURL())
      .setThumbnail(member.user.displayAvatarURL())
      .setColor(
        member.displayHexColor === "#000000"
          ? "#ffffff"
          : member.displayHexColor
      )
      .addField(
        "Información de Miembro",
        stripIndents`**Nombre:** ${member.displayName}
  **Ingreso al servidor:** ${joined}
  **Roles:** ${role}`,
        true
      )
      .addField(
        "Información de Usuario",
        stripIndents`**ID:** ${member.user.id}
  **Nickname:** ${member.user.username}
  **Tag de Discord:** ${member.user.tag}
  **Usuario creado:** ${created}`,
        true
      )
      .setTimestamp();
    const statatus = member.user.presence.activities;
    let gameStatus = []
    if (statatus) {
      statatus.forEach((sts) => {
        gameStatus.push(sts.name)
      });
      embed.addField("Jugando", `**> Juego:** ${gameStatus.join(" , ")}`);
    }

    message.channel.send(embed);
  }
};

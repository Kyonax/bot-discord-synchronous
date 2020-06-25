//Importación especifica de Metodos - RichEmbed - Color
const { MessageEmbed } = require("discord.js");
const { noneColor } = require("../../../database/utils/color/color.json");
const { putEmoji } = require("../../utils/misc/functions");
const { synchronous } = require("../../../database/utils/emojis/emojis.json");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const StateManager = require("../../utils/database/StateManager");
//Inicialización de Mapas guildCommandPrefix 
const guildCommandPrefix = new Map();
//Exportación del Comando prefix
module.exports = class PrefixCommand extends BaseCommand {
  //Constructor del Objeto
  constructor() {
    super(
      "prefix",
      ["prefijo"],
      "Comando para **Mostrar o Cambiar el Prefix** del Servidor.",
      "prefix <command>`\n**Comandos:** `<show>`,`<set>`",
      "_***Owner***_",
      "owner"
    );
    //Conexión con la Base de Datos
    this.connection = StateManager.connection;
  }
  async run(bot, message) {
    //Eliminación del mensaje con Comandos
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    //Inicialización de Variables cmdName - cmdOrder - newPrefix - Object Error - emoji Map - emoji ID
    const [cmdName, cmdOrder, newPrefix] = message.content.split(" ");
    const emoji = synchronous.emojiID[0].afirmado;
    //Consulta en el Mapa el actual Prefix
    const actualPrefix = guildCommandPrefix.get(message.guild.id);
    //Validación Orden digitada
    if (!cmdOrder) return err.noCmdOrder(bot, message);
    //Creación del Embed
    let embed = new MessageEmbed().setColor(noneColor);
    //Validación Emojis de Guild
    if (message.guild.id === synchronous.guildID) {
      embed.setTitle(`${putEmoji(bot, emoji)} Prefix`);
    } else {
      embed.setTitle(`✅ Prefix`);
    }
    //cmdOrder desiciones
    if (cmdOrder.toLowerCase() === "show") {
      embed.addField(
        "**PREFIX DEL BOT:**",
        `**Actual Prefix** del Servidor: ` +
          "`" +
          actualPrefix +
          "`" +
          `.\nPara **Cambiar el Prefix** del Servidor usa ` +
          "`" +
          actualPrefix +
          "prefix set <new_prefix>`.\n*Necesitas ser el **Dueño del Servidor** para usar este Comando.*"
      );
      message.channel.send(embed).then((msg) => {
        msg.delete({ timeout: 20000, reason: "It had to be done." });
      });
    } else if (cmdOrder.toLowerCase() === "set") {
      //Validación Permisos
      if (message.member.id != message.guild.ownerID)
        return perm.ownerPerms(bot, message);
      //Validaciones de Comando
      if (!newPrefix) return err.noNewPrefix(bot, message);
      embed.addField(
        "**PREFIX ACTUALIZADO:**",
        `**Nuevo** Prefix declarado: ` +
          "`" +
          newPrefix +
          "`" +
          `. \n**Usando** el comando ` +
          "`" +
          cmdName +
          "`."
      );
      try {
        await this.connection.query(
          `UPDATE GuildConfigurable SET cmdPrefix = '${newPrefix}' WHERE guildID = '${message.guild.id}'`
        );
        guildCommandPrefix.set(message.guild.id, newPrefix);
        StateManager.emit("prefixUpdate", message.guild.id, newPrefix);
        message.channel.send(embed).then((msg) => {
          msg.delete({ timeout: 10000, reason: "It had to be done." });
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
};

StateManager.on("prefixFetched", (guildID, prefix) => {
  guildCommandPrefix.set(guildID, prefix);
});


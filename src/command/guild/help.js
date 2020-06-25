//Importación especifica de Metodos - MessageEmbed - nonecolor Color - readdirSync
const { MessageEmbed } = require("discord.js");
const { noneColor } = require("../../../database/utils/color/color.json");
const { readdirSync } = require("fs");
//Importación Clase de Objetos - Conector Error
const Error = require("../../../database/conectors/error");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const StateManager = require("../../utils/database/StateManager");
//Inicialización de Mapas guildCommandPrefix
const guildCommandPrefix = new Map();
//Exportación del Comando help
module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super(
      "help",
      ["h", "ayuda", "commands", "comandos"],
      "¿No te parece **obvio** su uso?.",
      "help`.\n**Opciones:** `<name_command>`",
      "_***Todos***_",
      "guild"
    );
  }

  async run(bot, message, args) {
    //Eliminación de mensaje que usó el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const error = new Error();
    //Inicialización Guild Prefix
    const prefix = guildCommandPrefix.get(message.guild.id);
    //Validación de contenido y especificación del comando a Usar.
    if (!args[0]) {
      const categories = readdirSync("./src/command");
      //Creación de Mensaje Embed para Comandos Admin
      let firstEmbed = new MessageEmbed()
        .setDescription(
          `Hola **${message.author.username}** yo soy el **Bot principal** del servidor de **${message.guild.name}**, si quieres interactuar conmigo aquí te tengo **${bot.commands.size}** comandos que podrás usar.\n\n\n**Prefix: **` +
            "`" +
            prefix +
            "`" +
            " para ver el uso de los comandos **utiliza**: " +
            "`" +
            prefix +
            "help <command>`" +
            `\n \n **[FacebookPage Synchronous](https://www.facebook.com/SynchronousTeam)** | **[Paypal Synchronous](https://www.paypal.com/donate/?token=ijA5KviHPtPAygze4xuP1SdR4dF_5tPq8fcEAU7eLxcXVEy04l7cjSB92Wwf8TSjZDNNxW&country.x=CO&locale.x=CO)** \n \n \n`
        )
        .setColor(noneColor)
        .attachFiles(["./database/multimedia/gifs/embeds/HelpCommand.gif"])
        .setImage("attachment://HelpCommand.gif");
      categories.forEach((category) => {
        const dir = bot.commands.filter((c) => c.category === category);
        const capitalise =
          category.slice(0, 1).toUpperCase() + category.slice(1);
        try {
          firstEmbed.addField(
            `**${capitalise.toUpperCase()} COMMANDS** [${dir.size}]:`,
            dir.map((c) => `\`${c.name}\``).join(" ")
          );
        } catch (e) {
          console.log("Capitalise " + capitalise);
          console.log(e);
        }
      });
      //Envio de Mensajes
      message.author.send(firstEmbed).catch((err) => {
        message.channel
          .send(
            `${message.author} Ha ocurrido un **Error a la hora de enviar el mensaje!**`
          )
          .then((msg) => {
            msg.delete({ timeout: 40000, reason: "It had to be done." });
          });
        message.channel
          .send(error.dmCrash(bot, message, message.author))
          .catch((err) =>
            console.log(
              `El usuario ${message.author.username} tiene desactivado los Mensajes Directos.`
            )
          );
      });
    } else {
      const embed = new MessageEmbed()
        .setColor(noneColor)
        .setThumbnail(bot.user.displayAvatarURL());
      let command = bot.commands.get(
        bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase()
      );
      if (!command) return;
      const [cmdHelp, cmdName] = message.content.split(" ");
      embed.setTitle(`**${prefix + cmdName}**`);
      embed.setDescription(command.description);
      embed.addField(
        "**Propiedades del Comando**",
        " **Uso:** `" + prefix + command.usage,
        true
      );
      embed.addField(
        "**Alias:**",
        "`" + command.aliases.join(" , ") + "`",
        true
      );
      embed.addField("\u200b", "\u200b", true);
      embed.addField(
        "**Categoría:**",
        `**[${command.category.toUpperCase()}]**`,
        true
      );
      embed.addField("**Permisos:**", command.perms, true);
      embed.addField("\u200b", "\u200b", true);
      message.channel
        .send(embed)
        .then((msg) => {
          msg.delete({ timeout: 60000, reason: "It had to be done." });
        })
        .catch(console.error);
    }
  }
};

StateManager.on("prefixFetched", (guildID, prefix) => {
  guildCommandPrefix.set(guildID, prefix);
});

StateManager.on("prefixUpdate", (guildID, newPrefix) => {
  guildCommandPrefix.set(guildID, newPrefix);
});

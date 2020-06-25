//Importación de .js BaseCommand - BaseEvent
const BaseCommand = require("../structure/BaseCommand");
const BaseEvent = require("../structure/BaseEvent");
//Importando node.js files path - fs
const path = require("path");
const fs = require("fs").promises;
//Creando Función registerCommands
async function registerCommands(bot, dir = "") {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);
  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    if (stat.isDirectory()) registerCommands(bot, path.join(dir, file));
    if (file.endsWith(".js")) {
      const Command = require(path.join(filePath, file));
      if (Command.prototype instanceof BaseCommand) {
        const cmd = new Command();
        bot.commands.set(cmd.name, cmd);
        if (cmd.aliases)
          cmd.aliases.forEach((a) => bot.aliases.set(a, cmd.name));
      }
    }
  }
}
//Creando Función registerEvents
async function registerEvents(bot, dir = "") {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);
  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    if (stat.isDirectory()) registerEvents(bot, path.join(dir, file));
    if (file.endsWith(".js")) {
      const Event = require(path.join(filePath, file));
      if (Event.prototype instanceof BaseEvent) {
        const event = new Event();
        bot.on(event.name, event.run.bind(event, bot));
      }
    }
  }
}
//Exportando Funciones
module.exports = {
  registerCommands,
  registerEvents,
};

//Importando npm dotenv - discord.js (Client,Collection)
require("dotenv").config();
const { Client, Collection } = require("discord.js");
//Declarando bot como Client
const bot = new Client({ partials: ["MESSAGE", "REACTION"] });
//Importación de la Conexión con la Base De Datos - NO ELIMINAR
const StateManager = require("./utils/database/StateManager");
//Iniciación de Comandos y Alias de los Mismos con - discord.js (Collection)
["commands", "aliases"].forEach((x) => (bot[x] = new Collection()));
//Importación de las funciones registerCommands - registerEvents
const { registerCommands, registerEvents } = require("./utils/handler/handler");
//Ejecución de bot.login - registerCommands - registerEvents
(async () => {
  //Conexión con el Token del Bot Discord - usando dotenv
  bot.login(process.env.TOKEN);
  //Lectura de Comandos y Eventos
  await registerCommands(bot, "../../command");
  await registerEvents(bot, "../../event");
})();

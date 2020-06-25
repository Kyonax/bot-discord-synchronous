//Importación especifica de Metodos - RichEmbed - stripIndents -Errors
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { thrizzColor } = require("../../../database/utils/color/color.json");
//Importación Clase de Objetos - Conector Error
const Error = require("../../../database/conectors/error");
//Importación de la Clase Padre
const BaseCommand = require("../../utils/structure/BaseCommand");
//Importación de paquetes JS de Node.js
const fetch = require("node-fetch");
const dateFormat = require("dateformat");
//Keys
require("dotenv").config();
const token = process.env.STEAM;
module.exports = class SteamCommand extends BaseCommand {
  constructor() {
    super(
      "steam",
      ["stm", "valve"],
      "Comando para **Ver las Estadísticas** de una Persona en **Steam**.\n**Consejo:** Entra a tu perfil de **Steam** y configura el **URL**.",
      "steam <idurl_steam>`.",
      "_***Todos***_",
      "games"
    );
  }

  async run(bot, message, args) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    //Validaciones
    if (!args[0]) return err.noUserDigitS(bot, message);
    //Inicialización de Variables
    const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${token}&vanityurl=${args.join(
      " "
    )}`;
    fetch(url)
      .then((res) => res.json())
      .then((body) => {
        if (body.response.succes === 42) return err.noUserFound(bot, message);
        const id = body.response.steamid;
        const summaries = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${token}&steamids=${id}`;
        const bans = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${token}&steamids=${id}`;
        const state = [
          "Offline",
          "Online",
          "Bussy",
          "Away",
          "Snooze",
          "Looking to trade",
          "Lookin to play",
        ];

        fetch(summaries)
          .then((res) => res.json())
          .then((body) => {
            try {
              const {
                personaname,
                avatarfull,
                realname,
                personastate,
                loccountrycode,
                lastlogoff,
                profileurl,
                timecreated,
              } = body.response.players[0];
              fetch(bans)
                .then((res) => res.json())
                .then((body) => {
                  if (!body.players) return err.noUserFound(bot, message);
                  const { NumberOfVACBans, NumberOfGameBans } = body.players[0];
                  const embed = new MessageEmbed()
                    .setColor(thrizzColor)
                    .setAuthor(
                      `Servicio de Steam | ${personaname}`,
                      `https://image.flaticon.com/icons/png/512/23/23822.png`
                    )
                    .setThumbnail(avatarfull)
                    .setDescription(stripIndents`**Real Name:** ${
                    realname || "Unknown"
                  }
                **Estado** ${state[personastate]}                
                **País:** :flag_${
                  loccountrycode ? loccountrycode.toLowerCase() : "white"
                }:
                **Última Conexión:** ${dateFormat(
                  lastlogoff * 1000,
                  "d/mm/yyyy (h:MM:ss TT)"
                )} 
                **Cuenta Creada:** ${dateFormat(
                  timecreated * 1000,
                  "d/mm/yyyy (h:MM:ss TT)"
                )}
                **Bans Vac**: ${NumberOfVACBans}, **Bans Games**: ${NumberOfGameBans}
                **Link:** [${personaname} Link](${profileurl})`);
                  message.channel.send(embed);
                });
            } catch {
              return err.noUserFound(bot, message);
            }
          });
      });
  }
};

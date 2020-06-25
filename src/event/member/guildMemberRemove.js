//Importación de cuerpo de Eventos e importación de Conexión Base de Datos
const BaseEvent = require("../../utils/structure/BaseEvent");
//Exportación del Evento guildMemberAdd
module.exports = class GuildMemberRemoveEvent extends BaseEvent {
  constructor() {
    super("guildMemberRemove");
  }
  async run(bot, member) {
    //Variables
    let numberOfMembers = 0;
    let auxNumberOfMembers = 0;
    //Selección y conexión Con DATOS de la Guild Correspondiente
    bot.guilds.cache.forEach((guild) => {
      //Numero de Miembros Totales
      auxNumberOfMembers = numberOfMembers;
      numberOfMembers = auxNumberOfMembers + guild.members.cache.size;
      //Tracker Members
      const serverChannel = guild.channels.cache.find((ch) =>
        ch.name.includes("🌌-welcome")
      );
      if (!serverChannel) {
        return guild.channels
          .create("🌌-welcome", {
            type: "text",
            permissionOverwrites: [
              {
                id: guild.roles.everyone,
                deny: ["SEND_MESSAGES", "ATTACH_FILES"],
                allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
              },
            ],
          })
          .catch((err) => console.log(err));
      }
      serverChannel
        .setName("🌌-welcome-" + numberOfMembers)
        .catch((err) => console.log(err));
    });
  }
};

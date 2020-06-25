//Importación de cuerpo de Eventos e importación de Conexión Base de Datos
const BaseEvent = require("../../utils/structure/BaseEvent");
const StateManager = require("../../utils/database/StateManager");
//Exportación del Evento guildCreate
module.exports = class guildCreateEvent extends BaseEvent {
  //Constructor del Objeto
  constructor() {
    super("guildCreate");
    //Conexión con la Base de datos por medio de StateManager
    this.connection = StateManager.connection;
  }
  async run(bot, guild) {
    //Inserción de datos guildID - ownerID
    try {
      await this.connection.query(
        `INSERT INTO Guild VALUES('${guild.id}','${guild.ownerID}')`
      );
      await this.connection.query(
        `INSERT INTO GuildConfigurable (guildID) VALUES ('${guild.id}')`
      );
      console.log(
        `\nSe ha registrado una nueva Guild de Discord en la Base de Datos\nID:${guild.id} OwnerID:${guild.ownerID}`
      );
    } catch (err) {
      console.log(err);
    }
  }
};

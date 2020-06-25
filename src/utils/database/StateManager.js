//Importacion de node.js events (EventEmitter)
const { EventEmitter } = require("events");
EventEmitter.defaultMaxListeners = 20;
//Importando archivo Conexión con la Base de Datos
const connection = require("../../../database/mysql/db");
//Creando Clase StateManager - padre(EventEmitter)
class StateManager extends EventEmitter {
  constructor(opts) {
    super(opts);
    connection
      .then((connection) => (this.connection = connection))
      .catch((err) => console.log(err));
  }
}
//Exportando Conexión obtenida
module.exports = new StateManager();
//Creando la Conexión de Mysql DataBase Global

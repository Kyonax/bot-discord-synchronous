//Importando npm dotenv - mysql2/promise
require("dotenv").config();
const mysql = require("mysql2/promise");
//Exportando Conexión con la Base de Datos
module.exports = mysql
  //Creando Conexión con la base de Datos usando dotenv
  .createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  })
  .catch((err) => console.log(err));

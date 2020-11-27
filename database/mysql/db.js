//Importando npm dotenv - mysql2/promise
require("dotenv").config();
const mysql = require("mysql2/promise");
//Exportando Conexión con la Base de Datos
module.exports = mysql
  //Creando Conexión con la base de Datos usando dotenv
  .createConnection({
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'ba89ee34cfef0c',
    password: '96e47622',
    database: 'heroku_f7263fe53e8ea42'    
  })
  .catch((err) => console.log(err));

//Importación especifica de Metodos - getMember downloadUser delay
const { getMember, delay } = require("../../utils/misc/functions");
const { downloadUser } = require("../../utils/magik/functions");
//Inicialización de js de Node.js
var gm = require("gm"),
  imageMagick = gm.subClass({
    imageMagick: true,
  });
//Rutas de la plantilla
const background = "database/multimedia/images/magik/buenardo.jpg";
//Metodo de Edicion
async function edit(inImage, name) {
  imageMagick(background)
    .composite(inImage)
    .in("-compose", "Over")
    .in("-geometry", "120x120+165+170")
    .write(
      `database/multimedia/images/magik/exports/outputImage${name}Buenardo.png`,
      function (err) {
        console.log(err);

        if (!err) console.log("done");
      }
    );
}
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
module.exports = class BuenardoCommand extends BaseCommand {
  constructor() {
    super(
      "buenardo",
      ["bue", "buenisimo"],
      "Comando para **gritar** BUENARDOOO!!.",
      "buenardo`\n**Opciones:** `<user>`",
      "_***Todos***_",
      "magik"
    );
  }
  async run(bot, message, args) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Inicialización de Variables
    let autor = message.author;
    let member = getMember(message, args[0]);
    //Desición para identificar que imagen Colocar
    const imageMember = member.user.displayAvatarURL({
      format: "png",
      dynamic: true,
      size: 1024,
    });
    downloadUser(imageMember, autor.id).then(() => {
      delay(1300).then(async function () {
        edit(
          `database/multimedia/images/users/avatar/${autor.id}.png`,
          autor.id
        );
      });
      return delay(1700).then(async function () {
        message.channel.send("", {
          files: [
            `database/multimedia/images/magik/exports/outputImage${autor.id}Buenardo.png`,
          ],
        });
      });
    });
  }
};

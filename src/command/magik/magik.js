//Importación especifica de Metodos - downloadUser delay
const { delay } = require("../../utils/misc/functions");
const { downloadUser } = require("../../utils/magik/functions");
//Variables js de Node.js
var gm = require("gm");
//Metodo de Edicion
async function edit(inImage, name) {
  gm(inImage)
    .implode(-0.2)
    .resize(220, 220)
    .spread(1)
    .trim()
    .region(330, 330, 0, 0)
    .swirl(20)
    .region(100, 100, 80, 60)
    .implode(0.2)
    .region(100, 100, 10, 80)
    .implode(0.3)
    .region(150, 150, 90, 2)
    .implode(0.2)
    .region(150, 150, 40, 90)
    .implode(0.1)
    .region(50, 50, 2, 1)
    .implode(0.2)
    .region(50, 50, 100, 30)
    .implode(0.1)
    .region(100, 100, 70, 50)
    .implode(-0.2)
    .region(100, 100, 0, 70)
    .implode(-0.3)
    .region(150, 150, 80, 1)
    .implode(-0.2)
    .region(150, 150, 30, 80)
    .implode(-0.1)
    .region(50, 50, 2, 1)
    .implode(-0.2)
    .region(50, 50, 90, 20)
    .implode(-0.1)
    .chop(10, 10, 40, 50)
    .chop(20, 20, 70, 80)
    .chop(10, 10, 20, 10)
    .autoOrient()
    .noProfile()
    .write(
      `database/multimedia/images/magik/exports/outputImage${name}Magik.png`,
      function (err) {
        console.log(err);

        if (!err) console.log("done");
      }
    );
}
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
module.exports = class MagikCommands extends BaseCommand {
  constructor() {
    super(
      "magik",
      ["magia"],
      "Comando para **distorsionar** una **imagen**.",
      "magik`\n**Opciones:** `<user>`",
      "_***Todos***_",
      "magik"
    );
  }

  async run(bot, message, args) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Inicialización de variables
    let autor = message.author;
    let member = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    //Desicion para saber que imagen editar
    if (!member) {
      edit("database/multimedia/images/magik/lastImage.jpg", autor.id);
      return delay(3000).then(function () {
        message.channel.send("", {
          files: [
            `database/multimedia/images/magik/exports/outputImage${autor.id}Magik.png`,
          ],
        });
      });
    } else {
      const imageMember = member.user.displayAvatarURL({
        format: "png",
        dynamic: true,
        size: 1024,
      });
      downloadUser(imageMember, autor.id).then(() => {
        delay(1000).then(function () {
          edit(
            `database/multimedia/images/users/avatar/${autor.id}.png`,
            autor.id
          );
        });
        return delay(3000).then(function () {
          message.channel.send("", {
            files: [
              `database/multimedia/images/magik/exports/outputImage${autor.id}Magik.png`,
            ],
          });
        });
      });
    }
  }
};

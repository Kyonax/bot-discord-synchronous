//Importación especifica de Metodos - RichEmbed - delay putEmoji findUserID replaceUserItemsMention Function - synksPerms - masoUserNotFound - afirmado Emoji
const {
  delay,
  putEmoji,
  replaceUserItemsMention,
} = require("../../utils/misc/functions");
const { circleImage } = require("../../utils/magik/functions");
const { addMessageToBin } = require("../../utils/misc/bin");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//js de Node.js
const Fs = require("fs");
const Path = require("path");
const Axios = require("axios");
var gm = require("gm"),
  imageMagick = gm.subClass({
    imageMagick: true,
  });
//Metodo Descarga imagen de Autor de Mensaje
async function downloadAutor(imageUrl, name) {
  const url = imageUrl;
  const path = Path.resolve(
    __dirname,
    "../../../database/multimedia/images/users/avatar",
    `${name}.png`
  );

  const response = await Axios({
    method: "GET",
    url: url,
    responseType: "stream",
  });

  response.data.pipe(Fs.createWriteStream(path));

  return new Promise((resolve, reject) => {
    response.data.on("end", () => {
      resolve();
    });

    response.data.on("error", (err) => {
      reject(err);
    });
  });
}
//Metodo de Descarga usuario Masoquista o primer Usuario Mencionado
async function downloadMasoUser(imageUrl, name) {
  const url = imageUrl;
  const path = Path.resolve(
    __dirname,
    "../../../database/multimedia/images/users/avatar",
    `masoquist${name}Image.jpg`
  );

  const response = await Axios({
    method: "GET",
    url: url,
    responseType: "stream",
  });

  response.data.pipe(Fs.createWriteStream(path));

  return new Promise((resolve, reject) => {
    response.data.on("end", () => {
      resolve();
    });

    response.data.on("error", (err) => {
      reject(err);
    });
  });
}
//Metodo de Descarga de Usuario SadoMasoquista o usuario Mencionado de segundo
async function downloadSadoMasoUser(imageUrl, name) {
  const url = imageUrl;
  const path = Path.resolve(
    __dirname,
    "../../../database/multimedia/images/users/avatar",
    `sadoMasoquist${name}Image.jpg`
  );

  const response = await Axios({
    method: "GET",
    url: url,
    responseType: "stream",
  });

  response.data.pipe(Fs.createWriteStream(path));

  return new Promise((resolve, reject) => {
    response.data.on("end", () => {
      resolve();
    });

    response.data.on("error", (err) => {
      reject(err);
    });
  });
}
//Metodo de Edicion primera parte
async function firstStep(inImage, name, back, fSize, positionX, positionY) {
  imageMagick(`database/multimedia/images/magik/${back}`)
    .resize(450, 450)
    .composite(inImage)
    .in("-compose", "Over")
    .in("-geometry", `${fSize}x${fSize}+${positionX}+${positionY}`)
    .write(
      `database/multimedia/images/magik/exports/processing${name.id}Image.png`,
      function (err) {
        console.log(err);

        if (!err) console.log("done");
      }
    );
}
//Metodo de Edicion Segunda Parte
async function secondStep(inImage, name, sSize, positionX, positionY) {
  imageMagick(
    `database/multimedia/images/magik/exports/processing${name.id}Image.png`
  )
    .composite(inImage)
    .in("-compose", "Over")
    .in("-geometry", `${sSize}x${sSize}+${positionX}+${positionY}`)
    .write(
      `database/multimedia/images/magik/exports/output${name.id}ImageShhh.png`,
      function (err) {
        if (!err) console.log("done");
      }
    );
}
//Metodo de Edicion union de las Partes y Ejecucion
async function edit(
  masoUser,
  sadoUser,
  autor,
  back,
  fSize,
  sSize,
  fPositionX,
  fPositionY,
  sPositionX,
  sPositionY
) {
  firstStep(masoUser, autor, back, fSize, fPositionX, fPositionY);
  delay(1500).then(function () {
    secondStep(sadoUser, autor, sSize, sPositionX, sPositionY);
  });
}
//Metodo para realizar las ediciones despues de la Descarga principal
async function doIt(
  autor,
  sadoMasoUserMention,
  message,
  back,
  fSize,
  sSize,
  fPositionX,
  fPositionY,
  sPositionX,
  sPositionY
) {
  if (sadoMasoUserMention) {
    downloadSadoMasoUser(
      sadoMasoUserMention.displayAvatarURL({
        format: "png",
        dynamic: true,
        size: 1024,
      }),
      autor.username
    ).then(() => {
      edit(
        `database/multimedia/images/users/avatar/masoquist${autor.id}Image.jpg`,
        `database/multimedia/images/users/avatar/sadoMasoquist${autor.id}Image.jpg`,
        autor,
        back,
        fSize,
        sSize,
        fPositionX,
        fPositionY,
        sPositionX,
        sPositionY
      );
      return delay(2000).then(function () {
        message.channel.send("", {
          files: [
            `./database/multimedia/images/magik/exports/output${autor.id}ImageShhh.png`,
          ],
        });
      });
    });
  } else {
    downloadAutor(
      autor.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }),
      autor.id
    ).then(() => {
      edit(
        `database/multimedia/images/users/avatar/masoquist${autor.id}Image.jpg`,
        `database/multimedia/images/users/avatar/${autor.id}.png`,
        autor,
        back,
        fSize,
        sSize,
        fPositionX,
        fPositionY,
        sPositionX,
        sPositionY
      );
      return delay(2000).then(function () {
        message.channel.send("", {
          files: [
            `./database/multimedia/images/magik/exports/output${autor.id}ImageShhh.png`,
          ],
        });
      });
    });
  }
}
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
module.exports = class ShhhCommand extends BaseCommand {
  constructor() {
    super(
      "shhh",
      ["masoquist", "bitch", "perra"],
      "Comando para **tener** a tu perra masoquista.",
      "shhh <genre> <user>`\n**Género:** `<female>`,`<male>`\n**Opciones:** `<first_user>`,`<second_user>`",
      "_***Todos***_",
      "magik"
    );
  }
  async run(bot, message, args) {
    addMessageToBin(bot, message);
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    if (!message.channel.nsfw) return err.noValidChannel(bot, message);
    //Inicialización de Variables
    const autor = message.author;
    const genre = args[0];
    let fPositionX = 0;
    let fPositionY = 0;
    let sPositionX = 0;
    let sPositionY = 0;
    let fSize = 0;
    let sSize = 0;
    let back = "null";
    if (genre === "female") {
      fPositionX = 60;
      fPositionY = 210;
      sPositionX = 220;
      sPositionY = 80;
      fSize = 45;
      sSize = 40;
      back = "shh_female.jpg";
    } else if (genre === "male") {
      fPositionX = 50;
      fPositionY = 155;
      sPositionX = 175;
      sPositionY = 30;
      fSize = 65;
      sSize = 75;
      back = "shh.jpg";
    }

    let masoUserMention = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[1])
    );
    let sadoMasoUserMention = args[2];
    if (!args[0]) return err.genreNotDigit(bot, message);
    if (sadoMasoUserMention != undefined) {
      sadoMasoUserMention = replaceUserItemsMention(sadoMasoUserMention);
      sadoMasoUserMention = bot.users.cache.get(sadoMasoUserMention);
    }
    //Validaciones
    if (!masoUserMention) return err.masoUserNotFound(bot, message);
    //Descarga
    downloadMasoUser(
      masoUserMention.user.displayAvatarURL({
        format: "png",
        dynamic: true,
        size: 1024,
      }),
      autor.id
    );
    //Más Validaciones
    delay(1000).then(function () {
      doIt(
        autor,
        sadoMasoUserMention,
        message,
        back,
        fSize,
        sSize,
        fPositionX,
        fPositionY,
        sPositionX,
        sPositionY
      );
    });
  }
};

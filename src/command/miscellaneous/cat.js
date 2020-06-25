const { MessageEmbed } = require("discord.js");
const { lightblueColor } = require("../../../database/utils/color/color.json");
//Importación Clase de Objetos - Conector Error
const Error = require("../../../database/conectors/error");
//Variables js de Node.js
const fetch = require("node-fetch");
//Importación de la Clase Padre
const BaseCommand = require("../../utils/structure/BaseCommand.js");
//Exportación del Comando Cat
module.exports = class CatCommand extends BaseCommand {
  constructor() {
    super(
      "cat",
      ["gato", "michi"],
      "Comando para **generar** la foto de un **Michi**.",
      "cat`",
      "_***Todos***_",
      "miscellaneous"
    );
  }
  async run(bot, message) {
    //Eliminacion del mensaje enviado por el usuario al ejecutar el Comando
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    //Mensaje generando
    let msg = await message.channel.send("Generando...");
    //Solicitando Json
    fetch("http://aws.random.cat/meow")
      .then((res) => res.json())
      .then((body) => {
        if (!body || !body.file) return err.fetchCrash(bot, message);
        //Agregando imagen generada del Json y enviando Embed
        let embed = new MessageEmbed()
          .setColor(lightblueColor)
          .setAuthor(`🐱 ${bot.user.username} Michi!`, message.guild.iconURL())
          .setImage(body.file);
        msg.edit(embed);
      });
  }
};

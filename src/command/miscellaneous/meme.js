//Importación especifica de Metodos - RichEmbed - Colors - Errors
const { MessageEmbed } = require("discord.js");
const { lightblueColor } = require("../../../database/utils/color/color.json");
//Importación Clase de Objetos - Conector Error
const Error = require("../../../database/conectors/error");
//Variables js de Node.js
const fetch = require("node-fetch");
//Importación de la Clase Padre
const BaseCommand = require("../../utils/structure/BaseCommand.js");
//Exportación del Comando Meme
module.exports = class MemeCommand extends BaseCommand {
  constructor() {
    super(
      "meme",
      ["momo", "chiste"],
      "Comando para **generar** la imágen de un **Meme**.",
      "meme`",
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
    fetch("https://apis.duncte123.me/meme")
      .then((res) => res.json())
      .then((body) => {
        if (!body || !body.data.image) return err.fetchCrash(bot, message);
        //Agregando imagen generada del Json y enviando Embed
        let embed = new MessageEmbed()
          .setColor(lightblueColor)
          .setAuthor(`🤯 ${bot.user.username} Meme!`, message.guild.iconURL())
          .setImage(body.data.image);
        if (body.data.tittle)
          embed.setTitle(body.data.tittle).setURL(body.data.url);
        msg.edit(embed);
      });
  }
};

const { MessageEmbed } = require("discord.js");
const { noneColor } = require("../../../database/utils/color/color.json");
//Importación Clase de Objetos - Conector Error
const Error = require("../../../database/conectors/error");
module.exports = {
  welcomeMessage: async function (bot, member) {
    //Creación de Objetos
    const error = new Error();
    //Canal Default para Enviar la Alerta
    const channel = bot.channels.cache.find(
      (ch) => ch.name === "⋉⧼🌍⧽⋊general2⦊"
    );
    if (!channel) {
      return bot.channels
        .create("⋉⧼🌍⧽⋊general2⦊", {
          type: "text",
          permissionOverwrites: [
            {
              id: message.guild.roles.everyone,
              deny: ["SEND_MESSAGES", "ATTACH_FILES"],
              allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
            },
          ],
        })
        .catch((err) => console.log(err));
    }
    //Creacion de los mensajes Embed
    let embedTest = new MessageEmbed()
      .setTitle("🎉Bienvenida/o al Servidor de Discord Synchronous🎉")
      .setDescription(
        `**${member.displayName}** ahora eres miembro de nuestra gran comunidad de **Discord** y por ende te daré algunas ***pautas y consejos*** que necesitarás para disfrutar del **Servidor**.`
      )
      .addFields(
        { name: "\u200B", value: "\u200B" },
        {
          name: "**Bot Principal**",
          value:
            "Nuestro Servidor tiene un **Bot personalizado** que te será de mucha ayuda para **entretenerte, dar sugerencias, averiguar estadísticas y mucho mucho más**, para poder usarlo y ver sus comandos usa este **comando en cualquier canal de texto del Servidor:** `s!help`",
        },
        {
          name: "**Escoge un Rol**",
          value:
            "Para poder acceder a los **canales de Texto y Voz** debes elegir un Rol, para ello debes **dirigirte al canal de <#696103284129267812> y reaccionar con el emoji** correspondiente para ver los canales que deseas.",
        },
        {
          name: "**Lee las Reglas**",
          value:
            "Las reglas o normas son muy importantes en el Servidor, ellas nos **ayudan a mantener un mejor ambiente** y por ello es necesario que además de **Leer las reglas, también las Apliques** <#623742611298975744>.\n\n_Si se rompe alguna regla se te dará un **warn**, si tienes muchos es muy posible que se te **bannee del Servidor**_",
        },
        {
          name: "**Contáctanos y Apóyanos**",
          value:
            "**[FacebookPage](https://www.facebook.com/SynchronousTeam) | [YouTube](https://www.youtube.com/channel/UCjSHbvH1VPOWXGC_Z5wEHwQ) | [Paypal](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5LY2Y46Q7DSWL&source=url)** ",
        }
      )
      .setColor(noneColor)
      .attachFiles(["./database/multimedia/gifs/embeds/Welcome_Server.gif"])
      .setImage("attachment://Welcome_Server.gif");
    member.send(embedTest).catch((err) => {
      channel
        .send(
          `${member} Ha ocurrido un **Error a la hora de enviar el mensaje!**`
        )
        .then((msg) => {
          msg.delete({ timeout: 240000, reason: "It had to be done." });
        });
      channel
        .send(error.dmCrashWelcome(bot, member.displayName, channel))
        .catch((err) =>
          console.log(
            `El usuario ${member.displayName} tiene desactivado los Mensajes Directos.`
          )
        );
    });

    //Creación de Mensaje Embed para Comandos de Ayuda
    let pilarEmbed = new MessageEmbed()
      .setColor(noneColor)
      .setDescription(
        "El servidor **Synchronous** tiene como **Administradores** a los **Pilares** miembros del grupo de creadores de contenido **Synchronous**. Estos miembros son: \n\n_Ellos y algunos elegidos son los únicos que pueden usar comandos especiales_"
      )
      .addField(
        "**CLEVERSEA ⚔**",
        `**[Instagram](https://www.instagram.com/synk.cleversea/)** \n**[Twitch](https://www.twitch.tv/synk_cleversea)**\n**[Twitter](https://twitter.com/SCleversea)**`,
        true
      )
      .addField(
        "**KYONAX 🏮**",
        `**[Youtube](https://www.youtube.com/channel/UCOCGuDADwciaJfnCxWoYGHA)** \n**[Twitch](https://www.twitch.tv/synk_kyonax)** \n**[FacebookPage](https://www.facebook.com/MrKyonax/)**\n**[Twitter](https://twitter.com/Synk_Kyo)**\n**[GitHub](https://github.com/Kyonax)**`,
        true
      )
      .addField(
        "**THRIZZ ☔**",
        `**[Youtube](https://www.youtube.com/channel/UCv-PcEM_wsU-J3CrBUk72hg)** \n**[Twitch](https://www.twitch.tv/thrizzlive)** \n**[Instagram](https://www.instagram.com/synkthrizz)**`,
        true
      )
      .addField(
        "**PIXXA ☠**",
        `**[Twitch](https://www.twitch.tv/pixxa666)**`,
        true
      )
      .addField(
        "**FIREHOME 🖤**",
        `**[Twitch](https://www.twitch.tv/firehome15)** \n**[Instagram](https://www.instagram.com/natisrochita15/?hl=es-la)**`,
        true
      )
      .attachFiles(["./database/multimedia/gifs/embeds/Admins.gif"])
      .setImage("attachment://Admins.gif")
      .setFooter(
        "Todos los Pilares son parte del equipo de Synchronous",
        member.user.displayAvatarURL()
      )
      .setTimestamp();
    member.send(pilarEmbed).catch((err) => {
      channel
        .send(
          `${member} Ha ocurrido un **Error a la hora de enviar el mensaje!**`
        )
        .then((msg) => {
          msg.delete({ timeout: 60000, reason: "It had to be done." });
        });
      channel
        .send(error.dmCrash(bot, message, member))
        .catch((err) =>
          console.log(
            `El usuario ${member.displayName} tiene desactivado los Mensajes Directos.`
          )
        );
    });
  },
};

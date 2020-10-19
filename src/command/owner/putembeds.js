//Importación especifica de Metodos - RichEmbed - findUserID putEmoji Functions - Perms - stripIndents -  Emojis - nonecolor Color
const { MessageEmbed } = require("discord.js");
const { putEmoji } = require("../../utils/misc/functions");
const { stripIndents } = require("common-tags");
const {
  cancelado,
  synchronous,
  kyonax,
  clever,
  pixxa,
  afirmado,
  thrizz,
  pokemon,
  starcraft2,
  lol,
  csgo,
  mortalkombat,
  hearthstone,
  myb,
  minecraft,
  gtasa,
  gtav,
  anothergames,
  dst,
} = require("../../../database/utils/emojis/emojis.json");
const { noneColor } = require("../../../database/utils/color/color.json");
//Importación Clase de Objetos - Conector Error - Perms
const Error = require("../../../database/conectors/error");
const Perms = require("../../../database/conectors/perm");
//Importación de el cuerpo de Comandos e importación de Conexión Base de Datos
const BaseCommand = require("../../utils/structure/BaseCommand");
const StateManager = require("../../utils/database/StateManager");
//Exportación del Comando set
module.exports = class PutembedsCommand extends BaseCommand {
  constructor() {
    super(
      "putembeds",
      ["pembeds", "embedsput", "pem", "colocarembeds"],
      "Comando para **mandar** los mensajes **Embed** a los canales.",
      "putembeds <type>`",
      "***Pilares***",
      "owner"
    );
  }

  async run(bot, message, args) {
    //Eliminación del mensaje con Comandos
    message.delete().catch((O_o) => {});
    //Creación de Objetos
    const err = new Error();
    const perm = new Perms();
    //Validación Permisos
    if (message.member.id != message.guild.ownerID)
      return perm.ownerPerms(bot, message);
    //Variables
    let autor = message.author;
    //Validación de Variables - Permisos de Comandos - Falta de Usuario - Falta de Razón - Auto Baneo
    const channell = args[0];
    let rulesChannel = message.guild.channels.cache.find(
      (ch) => ch.name === "📃-reglas-rules"
    );
    let sugeChannel = message.guild.channels.cache.find(
      (ch) => ch.name === "🧠-sugerencias"
    );
    let chatChannel = message.guild.channels.cache.find(
      (ch) => ch.name === "💬-vc-chat"
    );
    let mtaChannel = message.guild.channels.cache.find(
      (ch) => ch.name === "🏮-mta-server"
    );

    switch (channell) {
      case "rules" /* 
        Creación del Mensaje Embed de Reglas
        let embedRule = new MessageEmbed()
          .setTitle(`**📜 Reglas del Servidor 📜**`)
          .setDescription(
            "Todos deseamos tener una experiencia amena en este servidor por ese motivo te invito a que leas y cumplas las siguientes normas del **Servidor**."
          )
          .addBlankField(true)
          .attachFiles(["../../../database/multimedia/gifs/embeds/ServerRules.gif"])
          .setImage("attachment://ServerRules.gif")
          .setColor(nonecolor)
          .addField(
            "**REGLA NÚMERO 1:**",
            "Respetar, procura no faltarle el respeto a ninguna persona, todos merecemos respeto." +
              `\n`
          )
          .addField(
            "**REGLA NÚMERO 2:**",
            "_No política - No religión_, sabemos que todos tenemos creencias e ideologías políticas diferentes, por esa razón merecen respeto, y la mejor manera de brindar dicho respeto es no comentar nada al respecto, todos somos diferentes y debemos entender que no todos tenemos las mismas creencias o ideologías, este es un servidor de entretenimiento nada más. Gracias por su compresión." +
              `\n`
          )
          .addField(
            "**REGLA NÚMERO 3:**",
            "**NSFW**, En este canal puedes publicar todo lo que quieras, pero procura no publicar _pornografía, gore, vídeos extremos etc..._ en los canales que no tienen esta categoría." +
              `\n`
          )
          .addField(
            "**REGLA NÚMERO 4:**",
            "_Spam_, el Spam no es permitido en ningún canal, si haces _Spam_ en cualquier canal, te ganas un __**Warn**__ a los __**3 Warns**__ te expulsamos del servidor." +
              `\n`
          )
          .addField(
            "**REGLA NÚMERO 5:**",
            "Personal, procura no publicar información personal en los canales." +
              `\n`
          )
          .addField(
            "**REGLA NÚMERO 6:**",
            "No confundir **CANALES**, existen canales para casi cualquier cosa, úsalos para lo que fueron hechos." +
              `\n`
          )
          .addField(
            "**REGLA NÚMERO 7:**",
            "No a la _Discriminación_, no aceptamos ningún tipo de discriminación de ningún tipo." +
              `\n`
          )
          .addField(
            "**REGLA NÚMERO 8:**",
            "_Igualdad_, ningún tipo de persona o ser existente tiene prioridades, todos somos iguales." +
              `\n`
          )
          .addField(
            "**REGLA NÚMERO 9:**",
            "_Broma_, algunas de las reglas anteriores se pueden abolir si se demuestra que fue algo en broma, se le preguntará al afectade por los hechos y si reconoce que fue una broma se le perdonará la condena al agresor." +
              `\n`
          )
          .addBlankField(true)
          .addField(
            stripIndents`**> __Links__**`,
            `\n[Synchronous Fanpage](https://facebook.com/SynchronousTeam) | [Paypal Synchronous](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5LY2Y46Q7DSWL&source=url)`
          )
          .setFooter("Constitución política de Synchronous")

          .setTimestamp();

        rulesChannel.send(embedRule); */:
        break;
      case "sugerencias" /* 
        //Creación del Mensaje Embed de Reglas
        let embedSuge = new MessageEmbed()
          .setTitle(`**🧠 Sugerencias y Peticiones 🧠**`)
          .setDescription(
            "Siéntete libre de opinar acerca del servidor, tus _**Recomendaciones**_ o _**Peticiones**_ ayudarán a mejorar el Servidor." +
              `\n \n \n`
          )
          .addField(
            "**SUGERENCIAS**",
            `Cualquier _**Sugerencia**_ se tendrá en cuenta siempre y cuando beneficie al servidor y a sus miembros.\n`
          )
          .addField(
            "**PETICIONES**",
            `Las peticiones pueden abarcar un sin número de **posibilidades**, estás se cumplirán siempre y cuando estemos _**de acuerdo de cumplir dicha petición**_, un ejemplo sería:\n \nPuedes hacer una _**petición de comandos**_ para un _**Bot**_, si la persona que desarrolla acepta la petición, se procederá a **programar dicho comando**.`
          )
          .attachFiles(["../../../database/multimedia/gifs/embeds/Sugerencias.gif"])
          .setImage("attachment://Sugerencias.gif")
          .setColor(nonecolor)
          .addBlankField(true)
          .addField(
            stripIndents`**> __Links__**`,
            `\n[Synchronous Fanpage](https://facebook.com/SynchronousTeam) | [Paypal Synchronous](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5LY2Y46Q7DSWL&source=url)`
          )
          .setFooter("Guía turística de Synchronous")

          .setTimestamp();

        sugeChannel.send(embedSuge); */:
        break;

      case "chat" /* 
        //Creación del Mensaje Embed de Reglas
        let embedChat = new MessageEmbed()
          .setTitle(`**💬 Chat Y Meeting 💬**`)
          .setDescription(
            "En este Canal podrás _**conversar**_ mientras te encuentras en un canal de voz, por si no tienes micrófono." +
              `\n \n \n`
          )
          .addField(
            "**USO CORRECTO**",
            `la idea de este canal es darle la **oportunidad de hablar** a alguien que no tenga _**micrófono**_, mientras se habla por **chat de voz**.\n`
          )
          .addField(
            "**USO INCORRECTO**",
            `En este canal no puedes abusar del _**SPAM**_ ${putEmoji(
              bot,
              cancelado
            )}, tampoco información que **NO** tenga que ver con la conversación **llevada** por alguno de los canales de voz.`
          )
          .attachFiles(["../../../database/multimedia/images/embeds/Chat.gif"])
          .setImage("attachment://Chat.gif")
          .setColor(nonecolor)
          .addBlankField(true)
          .addField(
            stripIndents`**> __Links__**`,
            `\n[Synchronous Fanpage](https://facebook.com/SynchronousTeam) | [Paypal Synchronous](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5LY2Y46Q7DSWL&source=url)`
          )
          .setFooter("Guía turística de Synchronous")
          .setTimestamp();

        chatChannel.send(embedChat); */:
        break;
      case "welcome" /* 
        let embedImageWelcome = new MessageEmbed()
          .attachFiles(["../../../database/multimedia/gifs/embeds/WelcomeToTheServer.gif"])
          .setImage("attachment://WelcomeToTheServer.gif")
          .setColor(nonecolor);
        let embedWelcome = new MessageEmbed()
          .setTitle(`**🎉 Bienvenida/o al Servidor 🎉**`)
          .setDescription(
            "Para proceder a ser parte del Servidor te invito a que primero **leas** las reglas del\nServidor luego procedas a **escoger** un rol reaccionando respectivamente a tus \nintereses.\n\n*- **Apoya** al servidor con nuestro **Fanpage** y **Paypal** -*" +
              `\n \n \n`
          )
          .setColor(nonecolor)
          .addField(
            stripIndents`**> __Links__**`,
            `\n[Synchronous Fanpage](https://facebook.com/SynchronousTeam) | [Paypal Synchronous](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5LY2Y46Q7DSWL&source=url)`
          );
        let embedWelcomeDescription = new MessageEmbed()
          .setTitle("**⛩ Roles de Seguidores ⛩**")
          .setDescription(
            `Cuando escojes un **Rol** tendrás accesos especifícos que te **otorga** dicho rol\nsi escojes un **Rol de Seguidores** de algún **Pilar** sólo podrás ver los canales de\ndicho **Pilar**, si deseas ver los canales de todos los **Pilares** escoje el rol de\n**Seguidor Synks**.\n\n\n`
          )
          .addField(
            `**ROLES**`,
            `${putEmoji(bot, synchronous)} <@&623721843949305858>\n${putEmoji(
              bot,
              clever
            )} <@&623722226356715522>\n${putEmoji(
              bot,
              kyonax
            )} <@&623722640036593685>`,
            true
          )
          .addBlankField(true)
          .addField(
            `**ROLES**`,
            `${putEmoji(bot, pixxa)} <@&624069017916669973>\n${putEmoji(
              bot,
              thrizz
            )} <@&623725235040157716>\n${putEmoji(
              bot,
              afirmado
            )} <@&623722441600139275>`,
            true
          )
          .attachFiles(["../../../database/multimedia/embeds/PilaresGif.gif"])
          .setImage("attachment://PilaresGif.gif")
          .setColor(nonecolor);
        let embedSubsRoles = new MessageEmbed()
          .setTitle("**🏆 Roles de Suscriptores 🏆**")
          .setDescription(
            `Los benefecios de ser un **Suscriptor** depende de cada **Pilar** pero estos beneficios pueden contener desde **Betas de aplicaciones**, **Ediciones Gratuitas**, **Contenido Innedito**, **Sponsors** y mucho mucho más.\n\nPara obtener un rol de **Suscriptor** debes estar suscrito en los canales de **Twitch** de alguno de los **Pilares**, apoyarle con **Patreon** o de alguna otra manera de forma **monetaria**.\n\n\n`
          )
          .addField(
            `**ROLES**`,
            `${putEmoji(bot, synchronous)} <@&623716996587978752>\n${putEmoji(
              bot,
              clever
            )} <@&623718343966326834>\n${putEmoji(
              bot,
              kyonax
            )} <@&623721044439465984>`,
            true
          )
          .addBlankField(true)
          .addField(
            `**ROLES**`,
            `${putEmoji(bot, pixxa)} <@&624067184544579585>\n${putEmoji(
              bot,
              thrizz
            )} <@&623724655198601222>\n${putEmoji(
              bot,
              afirmado
            )} <@&623720400714465300>\n\n\n`,
            true
          )
          .addField(
            stripIndents`**> __Links__**`,
            `\n[CleverSea Twitch](https://www.twitch.tv/synk_cleversea) | [Kyonax Twitch](https://www.twitch.tv/synk_kyonax) | [Pixxa Twitch](https://www.twitch.tv/pixxa666) | [Thrizz Twitch](https://www.twitch.tv/lthrizz) | [Firehome Twitch](https://www.twitch.tv/firehome15)`,
            false
          )
          .attachFiles(["../../database/gifs/embeds/PilaresGif.gif"])
          .setImage("attachment://PilaresGif.gif")
          .setColor(nonecolor);
        let embedWelcomeGamesRoles = new MessageEmbed()
          .setTitle("**🎮 Roles de Juegos 🎮**")
          .setDescription(
            `Si quieres acceder a **Canales** dónde puedas **compartir** tus gustos acerca de tu **VideoJuego** favorito reacciona para que los **Canales de Voz** y **Texto** se activen para ti. Si deseas ver todos los **Canales de Videojuegos** usa el rol **Games**.\n\n\n`
          )
          .addField(
            `**ROLES**`,
            `${putEmoji(bot, lol)} <@&696786998609969254>\n${putEmoji(
              bot,
              pokemon
            )} <@&696787286502670336>\n${putEmoji(
              bot,
              mortalkombat
            )} <@&696787375107604530>\n${putEmoji(
              bot,
              hearthstone
            )} <@&696787566036254760>\n${putEmoji(
              bot,
              csgo
            )} <@&696788135425605732>\n${putEmoji(
              bot,
              myb
            )} <@&696790273824653372>`,
            true
          )
          .addBlankField(true)
          .addField(
            `**ROLES**`,
            `${putEmoji(bot, starcraft2)} <@&696787175756398645>\n${putEmoji(
              bot,
              minecraft
            )} <@&696787490140455054>\n${putEmoji(
              bot,
              gtasa
            )} <@&696787789533937704>\n${putEmoji(
              bot,
              gtav
            )} <@&696787662757036092>\n${putEmoji(
              bot,
              dst
            )} <@&696787962087604264>\n${putEmoji(
              bot,
              anothergames
            )} <@&696788347539947670>`,
            true
          )
          .attachFiles(["../../database/gifs/embeds/GamesChannels.gif"])
          .setImage("attachment://GamesChannels.gif")
          .setColor(nonecolor);
        message.channel.send(embedImageWelcome);
        message.channel.send(embedWelcomeDescription);
        message.channel.send(embedSubsRoles);
        message.channel.send(embedWelcomeGamesRoles);
        message.channel.send(embedWelcome); */:
        break;
      case "MTA":
        //Inicialización de Emojis y su Uso respectivo
        let emoji = putEmoji(bot, synchronous.emojiID[0].gtasa);
        if (message.guild.id != synchronous.guildID) emoji = "💰";
        let embedWelcomeMTA = new MessageEmbed()
          .setTitle("**🎮 Server MTA - Beta Cerrada 🎮**")
          .setDescription(
            `Para acceder al contenido de el **Servidor de MTA** dónde encontrarás ***actualizaciones, recompensas, canales y mucho más*** reacciona con este emoji ${emoji}.\n\n\n`
          )
          .addField(
            `**ROLES**`,
            `${emoji} <@&711582241071038485>\n<@&623723333585862667>\n<@&711592453144313897>\n<@&711592516473978940>\n<@&711592553560014878>\n<@&711592591765798963>\n<@&711592641753645117>\n<@&711592731029536799>\n<@&711592824759648366>\n<@&711592876110250096>\n<@&711593225290383450>`,
            true
          )
          .addField(
            `**ROLES**`,
            `<@&711582059025662053>\n<@&711582151279116338>\n<@&711592908725420122>\n<@&711592946209783808>\n<@&711592974672199729>\n<@&711593034436837437>\n<@&711593082902151169>\n<@&711593190775455836>\n<@&711593147754348565>\n<@&711593190775455836>\n<@&711593335768350721>`,
            true
          )
          .attachFiles(["database/multimedia/gifs/embeds/Bio_ES.png"])
          .setImage("attachment://Bio_ES.png")
          .setColor(noneColor);
        mtaChannel.send(embedWelcomeMTA).catch((err) => console.log(err));
        break;
      case "TEST":
        let embedTest = new MessageEmbed()
          .setTitle("ABOUT KYONAX")
          .setDescription(
            `**Kyonax** was born on ** July 31, 2000 **, in ** Bogotá D.C / Colombia **, entering the world of digital content creation at the age of ** 12 years old**, and to the world of programming at ** 14 **, started with ** video editing **, shortly after with ** image editing **, ** creating ** ** scripts and poetry **.             He trained his voice for ** locution ** in a merely ** amateur ** way, He practiced and  created             programming projects in the well-known languages, ** Java, Javascript and Lua **. He currently             does not have any professional title, however he seeks to master and improve his skills in             ** programming and ** **digital content creation **, getting the necessary experience when             carrying out projects with great weight and  ** comic and informative **            **audiovisuals ** ** productions **. He is passionate about ** the seventh art ** and a complete obsessed` +
              ` with ** human creativity **. One of his major goals is to create a association of people` +
              ` who share his ** whim for creation** **and creativity **, with the objective to dazzle and show` +
              ` to the world the beautiful and complex human nature, said association that will take the` +
              ` name of ** Synchronous **.`
          )
          .setColor(noneColor)
          .attachFiles(["database/multimedia/gifs/embeds/Bio_EN.png"])
          .setImage("attachment://Bio_EN.png");
        message.channel.send(embedTest);
        break;
      case "ABOUT":
        let embedImage = new MessageEmbed()
          .setColor(noneColor)
          .attachFiles([
            "database/multimedia/images/demo/server/KyonaxInformationBanners2.png",
          ])
          .setImage("attachment://KyonaxInformationBanners2.png");
        message.channel.send(embedImage);

        let embedAcerca = new MessageEmbed()
          .setTitle("ACERCA DE KYONAX")
          .setDescription(
            `**Kyonax** nació  el **31 de Julio del año 2000**, en **Bogotá D.C / Colombia**, entró al mundo de la       creación digital de contenido a la edad de **12 años**,  y al mundo de la programación a los **14 años de edad**,         ` +
              ` empezó  con la  **edición de vídeo**,  poco después  con la  **edición de  imágenes**,  **creación de**             **guiones y poesía**.  Entrenó su voz para  **locución** de  forma meramente  **amateur**, practicó y             creó proyectos de  programación en  los lenguajes conocidos como, **Java , Javascript y Lua**.            Actualmente   no  cuenta   con  ningún  título   profesional,  no  obstante  busca  dominar  y             perfeccionar   sus   habilidades   en   la  **creación  de   contenido  digital  y de programación**,             consiguiendo  la experiencia necesaria  al realizar proyectos  con gran peso y **producciones**            **audiovisuales  cómicas e informativas**. Es un apasionado por **el séptimo arte** y un completo` +
              ` obsesionado  por la  **creatividad humana**.  Uno de sus mayores  objetivos es el de crear una` +
              ` asociación de  personas que compartan su  **capricho por la creación y la creatividad**,  con el` +
              ` objetivo  de  deslumbrar  y  demostrar  al  mundo la  hermosa aunque  compleja  naturaleza` +
              ` humana, dicha asociación que llevará el nombre de **Synchronous**.`
          )
          .setColor(noneColor)
          .attachFiles(["database/multimedia/gifs/embeds/Bio_ES.png"])
          .setImage("attachment://Bio_ES.png");
        message.channel.send(embedAcerca);

        let embedAbout = new MessageEmbed()
          .setTitle("ABOUT KYONAX")
          .setDescription(
            `**Kyonax** was born on ** July 31, 2000**, in ** Bogotá D.C / Colombia**, entering the world of digital content creation at the age of ** 12 years old**, and to the world of programming at the age of ** 14 years old**, started with ** video editing**, shortly after with ** image editing**, ** creating** ** scripts and poetry**.             He trained his voice for ** locution ** in a merely ** amateur ** way, He practiced and  created             programming projects in the well-known languages, ** Java, Javascript and Lua**. He currently             does not have any professional title, however he seeks to master and improve his skills in             ** programming and ** **digital content creation**, getting the necessary experience when             carrying out projects with great weight and  ** comic/informative **            **audiovisuals ** ** productions**. He is passionate about ** the seventh art ** and a complete obsessed` +
              ` with ** human creativity**. One of his major goals is to create an association of people` +
              ` who share his** whim for creation** **and creativity**, to dazzle and show` +
              ` to the world the beautiful and complex human nature, association that will take the` +
              ` name of** Synchronous **.`
          )
          .setColor(noneColor)
          .attachFiles(["database/multimedia/gifs/embeds/Bio_EN.png"])
          .setImage("attachment://Bio_EN.png");
        message.channel.send(embedAbout);
        break;
      case "RULES":
        let embedBannerRulesEs = new MessageEmbed()
          .setColor(noneColor)
          .attachFiles([
            "database/multimedia/images/demo/server/KyonaxRulesBanners.png",
          ])
          .setImage("attachment://KyonaxRulesBanners.png");
        message.channel.send(embedBannerRulesEs);
        let embedRulesEs = new MessageEmbed()
          .setTitle("NORMAS DE LA COMUNIDAD")
          .setDescription(
            `            
            **Regla número 1**
            No confundir **CANALES**, los mensajes deben enviarse a los canales destinados.` +
              ` En caso contrario, pueden ser borrados sin previo aviso, revisa la descripción y los` +
              ` mensajes fijados en los canales en los que estés, Algunos canales tienen sus propias` +
              ` reglas a las que adaptarse.
            
            **Regla número 2**
            **Respetar**, Ten un trato respetuoso hacia otros miembros del chat.` +
              ` En los canales, no se toleran mensajes con contenido político, obsceno, o religioso de característica` +
              ` amenazante, difamatoria y condescendiente, que provoca odio hacia los demás.
            
            **Regla número 3**
            **Spam**, No está permitido el spam o enviar mensajes, imágenes o emoticonos innecesarios y repetitivos. 
            
            **Regla número 4**
            **NSFW**, No se tolerará bajo ninguna circunstancia publicar enlaces,` +
              ` imágenes o textos de característica sexualmente explícita u ofensiva.` +
              ` Eso incluye cualquier tipo de imágenes o enlaces relacionados con hentai,` +
              ` violencia o fotos cuyo propósito sea impactar a los demás miembros.` +
              ` No se permite abusar del filtro de palabras, especialmente para este propósito.
            
            **Regla número 5**
            **Suplantación**,está prohibido hacerse pasar por "moderador" o "admin" en los canales.` +
              ` Tales actos serán fáciles de detectar y resultarán en un castigo por parte del equipo de Kyonax.` +
              ` Por favor no dudes en contactarnos si encuentras casos similares.
            
            **Regla número 6**
            **Publicidad** de vídeos, streams, servers, links, entre otros, no está permitido en los canales de texto` +
              ` excepto en la sección destinada a publicidad.
            
            
            ` +
              putEmoji(bot, "764154680582340618") +
              ` **Este canal tiene la __versión corta__ de las reglas**. Para ver las reglas completas a las que estás sujeto, ingresa a este enlace:    

            `
          )
          .addField(
            stripIndents`**> LIBRO DE REGLAS **`,
            stripIndents`** ` +
              putEmoji(bot, "763478205071097886") +
              ` https://kyonax.link/rules_es**`
          )
          .setColor(noneColor)
          .attachFiles(["database/multimedia/gifs/embeds/Rules_ES.png"])
          .setImage("attachment://Rules_ES.png");
        message.channel.send(embedRulesEs);

        let embedRulesEn = new MessageEmbed()
          .setTitle("COMMUNITY GUIDELINES")
          .setDescription(
            `
            **Rule number 1**
            Do not confuse **CHANNELS**, please chat in the correct channels! Messages may be deleted without notice` +
              ` if they are not in the right place/content. Visit channel pins and channel description for additional notes!
            
            **Rule number 2**
            **Respect**, message in a respectful manner towards each other. Flaming, harassment, and abuse is NOT tolerated.` +
              ` This includes messages that are threatening, obscene, defamatory, condescending, libelous, or otherwise racially,` +
              ` religiously, politically, or sexually objectionable.
            
            **Rule number 3**
            **Spam**, do not spam or flood the chat with constant separate messages of single letters, words, images, or emoticons.` +
              ` Be mindful of others.
            
            **Rule number 4**
            **NSFW**, posting pornographic or severely offensive links, images, or text will NOT be tolerated.` +
              ` This includes any sort of hentai, gore, shock images, etc. Do not bypass the word filter, especially for this intent.
            
            **Rule number 5**
            **Impersonation**, It is forbidden to impersonate "moderator" or "admin" in the channels.` +
              ` Such acts will be easy to detect and will result in punishment from the Kyonax team.` +
              ` Please do not hesitate to contact us if you find similar cases.
            
            **Rule number 6**
            **Advertising** of videos, streams, servers, links, among others, is not allowed in text channels except in the section` +
              ` dedicated to advertising.
            
            ` +
              putEmoji(bot, "764154680582340618") +
              ` **This channel has __a short version__ of the rules**. To see the complete rules to which you are subject, go to this link:`
          )
          .addField(
            stripIndents`**> RULES BOOK **`,
            stripIndents`** ` +
              putEmoji(bot, "763478205071097886") +
              ` https://kyonax.link/rules_en**`
          )
          .setColor(noneColor)
          .attachFiles(["database/multimedia/gifs/embeds/Rules_EN.png"])
          .setImage("attachment://Rules_EN.png");
        message.channel.send(embedRulesEn);

        let embedAcceptRules = new MessageEmbed()
          .setDescription(
            `
          _Una vez **leas todo, __reacciona__** con ` +
              putEmoji(bot, "763478008627200021") +
              ` para aceptar los términos._
          _Once you've **read this, __react__** with ` +
              putEmoji(bot, "763478008627200021") +
              ` to accept the terms._`
          )
          .setColor(noneColor)
          .attachFiles(["database/multimedia/gifs/embeds/Accept.png"])
          .setImage("attachment://Accept.png");
        message.channel.send(embedAcceptRules);
        break;
      case "SERVER":
        let embedBannerServerEs = new MessageEmbed()
          .setColor(noneColor)
          .attachFiles([
            "database/multimedia/images/demo/server/KyonaxServerBanners.png",
          ])
          .setImage("attachment://KyonaxServerBanners.png");
        message.channel.send(embedBannerServerEs);

        let embedServerEs = new MessageEmbed()
          .setTitle("COMMUNITY GUIDELINES")
          .setDescription()
          .setColor(noneColor)
          .attachFiles(["database/multimedia/gifs/embeds/Rules_EN.png"])
          .setImage("attachment://Rules_EN.png");
        message.channel.send(embedServerEs);
        break;
      case "NOTHING":
        message.channel.send(
          "Si no puedes ver los mensajes en este canal, ve a **Configuraciones de Usuario > Texto e imágenes** (Asegurate que todas las opciones estén activadas)"
        );
        message.channel.send(
          "If you can't see anything in this channel, go to **User Settings > Text & Images > Link Preview** (make sure this is toggled on!)"
        );
        break;
      case "SOCIALME":
        let embedBannerSocialEs = new MessageEmbed()
          .setColor(noneColor)
          .attachFiles([
            "database/multimedia/images/demo/server/KyonaxSocialMediarBanners.png",
          ])
          .setImage("attachment://KyonaxSocialMediarBanners.png");
        message.channel.send(embedBannerSocialEs);

        let embedSocialEs = new MessageEmbed()
          .setTitle("REDES SOCIALES")
          .setDescription(
            `
            Kyonax como creador de contenido maneja varias redes sociales, si quieres apoyarle para que suba más contenido,` +
              ` síguelo dando click en estos enlaces:
              
              `
          )
          .addField(
            stripIndents`**> Enlaces:**`,
            `
          
          ` +
              putEmoji(bot, "763478205071097886") +
              ` **Facebook: https://kyonax.link/facebook**
              ` +
              putEmoji(bot, "763478205071097886") +
              ` **Instagram: https://kyonax.link/instagram**
              ` +
              putEmoji(bot, "763478205071097886") +
              ` **YouTube: https://kyonax.link/youtube**
              ` +
              putEmoji(bot, "763478205071097886") +
              ` **Twitch: https://kyonax.link/twitch**
              ` +
              putEmoji(bot, "763478205071097886") +
              ` **TikTok: https://kyonax.link/tiktok**
              ` +
              putEmoji(bot, "763478205071097886") +
              ` **GitHub: https://kyonax.link/github**
              ` +
              putEmoji(bot, "763478205071097886") +
              ` **Twitter: https://kyonax.link/twitter**

              ` +
              putEmoji(bot, "763478205071097886") +
              ` **Kyonax's Comfy Fort: https://kyonax.link/discord**
          
          **El Reddit de Kyonax no está agregado porque __aún no usa esa Red Social__.**` +
              ` Todas los enlaces a las redes sociales que usa están arriba, si encuentras cualquier cuenta con su nombre` +
              ` que no esté en los enlaces de arriba o en el **LinkTree** del enlace de abajo, significa que **__no está asociada__ con Kyonax.**


          `
          )
          .addField(
            stripIndents`**> LinkTree con todos los enlaces a redes sociales que administra Kyonax:**
          `,
            `` +
              putEmoji(bot, "763478205071097886") +
              ` **LinkTree: https://linktr.ee/kyonax**`
          )
          .setColor(noneColor)
          .attachFiles(["database/multimedia/images/demo/server/CreatorContent.png"])
          .setImage("attachment://CreatorContent.png");
        message.channel.send(embedSocialEs);

        let embedSocialEn = new MessageEmbed()
          .setTitle("SOCIAL MEDIA")
          .setDescription(
            `
            Kyonax as a content creator manages several social networks, if you want to support him to upload more content,` +
              ` follow him by clicking on these links:
              
              `
          )
          .addField(
            stripIndents`**> Links:**`,
            `
          
          ` +
              putEmoji(bot, "763478205071097886") +
              ` **Facebook: https://kyonax.link/facebook**
              ` +
              putEmoji(bot, "763478205071097886") +
              ` **Instagram: https://kyonax.link/instagram**
              ` +
              putEmoji(bot, "763478205071097886") +
              ` **YouTube: https://kyonax.link/youtube**
              ` +
              putEmoji(bot, "763478205071097886") +
              ` **Twitch: https://kyonax.link/twitch**
              ` +
              putEmoji(bot, "763478205071097886") +
              ` **TikTok: https://kyonax.link/tiktok**
              ` +
              putEmoji(bot, "763478205071097886") +
              ` **GitHub: https://kyonax.link/github**
              ` +
              putEmoji(bot, "763478205071097886") +
              ` **Twitter: https://kyonax.link/twitter**

              ` +
              putEmoji(bot, "763478205071097886") +
              ` **Kyonax's Comfy Fort: https://kyonax.link/discord**
          
          **Kyonax's Reddit is not added because __he doesn't use that Social Network yet__**` +
              ` All the links to the social networks he uses are above, if you find any account with his name` +
              ` that is not in the links above or in the **LinkTree** of the link below, it means that it is not associated with **Kyonax.**


          `
          )
          .addField(
            stripIndents`**> LinkTree with all the social media links:**
          `,
            `` +
              putEmoji(bot, "763478205071097886") +
              ` **LinkTree: https://linktr.ee/kyonax**`
          )
          .setColor(noneColor)
          .attachFiles(["database/multimedia/images/demo/server/CreatorContent.png"])
          .setImage("attachment://CreatorContent.png");
        message.channel.send(embedSocialEn);

        let embedNotifyRules = new MessageEmbed()
          .setDescription(
            `
            Recibe **notificaciones** reaccionando con los siguientes emojis.
            Receive **notifications** reacting with the following emojis.
            `
          )
          .addField(
            stripIndents`**> Role Emojis:**`, 
            `
            ` +
              putEmoji(bot, "764154680350867457") +
              ` **GitHub: **` +
              putEmoji(bot, "764154679947952211") +
              ` 
              ` +
              putEmoji(bot, "764154680350867457") +
              ` **Twitter:** ` +
              putEmoji(bot, "764156796733751306") +
              `              
            `,true
          )
          .addField(stripIndents`**> Role Emoji:**`,
            `
            ` +
              putEmoji(bot, "764154680350867457") +
              ` **Twitch:** ` +
              putEmoji(bot, "767820188576907334") +
              `
              ` +
              putEmoji(bot, "764154680350867457") +
              ` **YouTube:** ` +
              putEmoji(bot, "767820188228780064") +
              `
            `,true
          )
          .setColor(noneColor)
          .attachFiles(["database/multimedia/gifs/embeds/Notify_EN_ES.png"])
          .setImage("attachment://Notify_EN_ES.png");
        message.channel.send(embedNotifyRules);
        break;
      default:
        return message.channel.send("No se encuentra el canal.");
    }
  }
};

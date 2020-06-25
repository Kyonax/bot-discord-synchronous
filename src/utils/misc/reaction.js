const { synchronous } = require("../../../database/utils/emojis/emojis.json");
module.exports = {
  reactionEmbeds: async function (bot, message) {
    //Reacción a Mensajes Embed
    if (message.author.bot) {
      if (message.embeds) {
        //Inicialización de Emojis y su Uso respectivo
        let clever = synchronous.emojiID[0].clever;
        let kyonax = synchronous.emojiID[0].kyonax;
        let pixxa = synchronous.emojiID[0].pixxa;
        let thrizz = synchronous.emojiID[0].thrizz;
        let afirmado = synchronous.emojiID[0].afirmado;
        let cancelado = synchronous.emojiID[0].cancelado;

        let lol = synchronous.emojiID[0].lol;
        let pokemon = synchronous.emojiID[0].pokemon;
        let csgo = synchronous.emojiID[0].csgo;
        let myb = synchronous.emojiID[0].myb;
        let minecraft = synchronous.emojiID[0].minecraft;
        let gtasa = synchronous.emojiID[0].gtasa;
        let gtav = synchronous.emojiID[0].gtav;
        let dst = synchronous.emojiID[0].dst;
        let anothergames = synchronous.emojiID[0].anothergames;
        let mortalkombat = synchronous.emojiID[0].mortalkombat;
        let hearthstone = synchronous.emojiID[0].hearthstone;
        let starcraft2 = synchronous.emojiID[0].starcraft2;

        let title = message.embeds.find((msg) => msg.title);
        let footer = message.embeds.find((msg) => msg.footer);
        if (!title) return;
        //Welcome Embed
        const roleSynksEmbed = message.embeds.find(
          (msg) => msg.title === "**⛩ Roles de Seguidores ⛩**"
        );
        //Games Roles
        const gamesRoleEmbed = message.embeds.find(
          (msg) => msg.title === "**🎮 Roles de Juegos 🎮**"
        );
        //Suggestions
        const suggestionEmbed = message.embeds.find((msg) =>
          msg.title.includes("Suggestion")
        );
        //Polls
        const pollEmbed = message.embeds.find((msg) =>
          msg.title.includes("Poll")
        );
        //Embed Suggestion
        if (suggestionEmbed) {
          try {
            await message.react(afirmado);
            await message.react(cancelado);
          } catch (err) {
            console.log(err);
          }
        }
        //Embed Poll
        if (pollEmbed) {
          try {
            await message.react(afirmado);
            await message.react(cancelado);
          } catch (err) {
            console.log(err);
          }
        }
        //Embeds Welcome
        if (roleSynksEmbed) {
          await message.react(clever).catch((err) => console.error);
          await message.react(kyonax).catch((err) => console.error);
          await message.react(pixxa).catch((err) => console.error);
          await message.react(thrizz).catch((err) => console.error);
          await message.react(afirmado).catch((err) => console.error);
        }
        //Games Roles
        if (gamesRoleEmbed) {
          await message.react(lol).catch((err) => console.error);
          await message.react(pokemon).catch((err) => console.error);
          await message.react(mortalkombat).catch((err) => console.error);
          await message.react(hearthstone).catch((err) => console.error);
          await message.react(csgo).catch((err) => console.error);
          await message.react(myb).catch((err) => console.error);
          await message.react(starcraft2).catch((err) => console.error);
          await message.react(minecraft).catch((err) => console.error);
          await message.react(gtasa).catch((err) => console.error);
          await message.react(gtav).catch((err) => console.error);
          await message.react(dst).catch((err) => console.error);
          await message.react(anothergames).catch((err) => console.error);
        }

        if (!footer) return;
        //News
        const newsEmbed = message.embeds.find((msg) =>
          msg.footer.text.includes("News")
        );
        //Embed Suggestion
        if (newsEmbed) {
          try {
            await message.react(afirmado);
            await message.react(cancelado);
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
  },
};

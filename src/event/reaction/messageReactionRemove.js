//Importación de la Clase Padre
const BaseEvent = require("../../utils/structure/BaseEvent");
module.exports = class MessageReactionRemove extends BaseEvent {
  constructor() {
    super("messageReactionRemove");
  }

  async run(bot, reaction, user) {
    if (user.bot) return;
    let applyRole = async () => {
      let emojiName = reaction.emoji.name;
      let member = reaction.message.guild.members.cache.find(
        (member) => member.id === user.id
      );
      try {
        if (member) {
          if (
            emojiName.toLowerCase() == "cleversea" ||
            emojiName.toLowerCase() == "firehome" ||
            emojiName.toLowerCase() == "kyonax" ||
            emojiName.toLowerCase() == "pixxa" ||
            emojiName.toLowerCase() == "thrizz" ||
            emojiName.toLowerCase() == "synk"
          ) {
            let role = reaction.message.guild.roles.cache.find(
              (role) =>
                role.name.toLowerCase() ===
                "seguidor-" + emojiName.toLowerCase()
            );
            if (!member.roles) member.roles.add("696113185945550988");
            member.roles.remove(role).catch((err) => console.error);
          }

          if (
            emojiName.toLowerCase() + "" == "counterstrikego" ||
            emojiName.toLowerCase() + "" == "dontstarvetogether" ||
            emojiName.toLowerCase() + "" == "games" ||
            emojiName.toLowerCase() + "" == "gtasanandreas" ||
            emojiName.toLowerCase() + "" == "gtav" ||
            emojiName.toLowerCase() + "" == "hearthstone" ||
            emojiName.toLowerCase() + "" == "leagueoflegends" ||
            emojiName.toLowerCase() + "" == "mountandblade" ||
            emojiName.toLowerCase() + "" == "minecraft" ||
            emojiName.toLowerCase() + "" == "mortalkombat" ||
            emojiName.toLowerCase() + "" == "pokemon" ||
            emojiName.toLowerCase() + "" == "starcraft2"
          ) {
            let msg = await reaction.message.fetch();
            if (msg.id === "711599031729782845") {
              if (!member.roles) member.roles.add("696113185945550988");
              member.roles
                .remove("711582241071038485")
                .catch((err) => console.error);
            } else {
              let role = reaction.message.guild.roles.cache.find(
                (role) => role.name.toLowerCase() === emojiName.toLowerCase()
              );
              if (!member.roles) member.roles.add("696113185945550988");
              member.roles.remove(role.id).catch((err) => console.error);
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (reaction.message.partial) {
      try {
        let msg = await reaction.message.fetch();
        if (
          msg.id === "696973017485672488" ||
          msg.id === "696973264668590110" ||
          msg.id === "711599031729782845"
        ) {
          applyRole();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      let msg = await reaction.message.fetch();
      if (
        msg.id === "696973017485672488" ||
        msg.id === "696973264668590110" ||
        msg.id === "711599031729782845"
      ) {
        applyRole();
      }
    }
  }
};

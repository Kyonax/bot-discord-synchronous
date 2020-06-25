const fs = require("fs");
let bin = require("../../../database/utils/adds/bin.json");
module.exports = {
  addMessageToBin: function (bot, message) {
    if (!bin[message.guild.id]) {
      bin[message.guild.id] = {
        users: {},
      };
    }

    if (!bin[message.guild.id].users[message.author.id]) {
      bin[message.guild.id].users[message.author.id] = {
        name: message.author.username,
        messages: [],
      };
    }

    let messages = bin[message.guild.id].users[message.author.id].messages;
    let size = messages.length;
    bin[message.guild.id].users[message.author.id].messages[size] =
      message.content;

    fs.writeFile(
      "./database/utils/adds/bin.json",
      JSON.stringify(bin),
      (err) => {
        if (err) console.log(err);
      }
    );
  },
  //TODO: Removal Items by Position
  removeMessageFromBin: function (bot, message, location, items) {
    let messages = bin[message.guild.id].users[message.author.id].messages;
    messages = messages.splice(location, items);

    fs.writeFile(
      "./database/utils/adds/bin.json",
      JSON.stringify(bin),
      (err) => {
        if (err) console.log(err);
      }
    );
  },
};

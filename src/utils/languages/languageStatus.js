module.exports = {
  StatusLanguageUsers: function (array) {
    array = [
      "Users",
      "Usuarios",
      "ユーザー",
      "Пользователи",
      "Utenti",
      "Benutzer",
      "用户数",
    ];

    let result = array[Math.floor(Math.random() * array.length)];
    return result;
  },
  StatusLanguageChannels: function (array) {
    array = [
      "频道",
      "Channels",
      "Canales",
      "チャンネル",
      "Каналес",
      "Kanäle",
    ];
    let result = array[Math.floor(Math.random() * array.length)];
    return result;
  },
  StatusLanguageRoles: function (array) {
    array = ["Roles", "Rollen", "Роли", "役割", "的角色", "Ruoli"];
    let result = array[Math.floor(Math.random() * array.length)];
    return result;
  },
  StatusLanguageGuilds: function (array) {
    array = [
      "Guilds",
      "Gremios",
      "公会",
      "ギルド",
      "Gilde",
      "Гильдий",
      "Gilden",
    ];
    let result = array[Math.floor(Math.random() * array.length)];
    return result;
  },
  StatusLanguageEmojis: function (array) {
    array = [
      "Смайликов",
      "Emoticonos",
      "Emoticons",
      "Emojis",
      "絵文字",
      "表情符号",
      "Smileys",
    ];
    let result = array[Math.floor(Math.random() * array.length)];
    return result;
  },
  StatusLanguageGuild: function (array) {
    array = ["Guild", "Gremio", "Gilda", "公会", "ギルド", "Гильдия", "Gilde"];
    let result = array[Math.floor(Math.random() * array.length)];
    return result;
  },
  StatusLanguageRole: function (array) {
    array = ["Rolle", "Rol", "Ruolo", "Роль", "役割", "角色", "وظيفة", "Role"];
    let result = array[Math.floor(Math.random() * array.length)];
    return result;
  },
  StatusLanguageHelp: function (array) {
    array = [
      "Usa s!help para ver los Comandos. | Synchronous",
      "Use s!help to see the Commands. | Synchronous",
      "s!help を使用してコマンドを表示します. | Synchronous",
      "使用 s!help 查看命令. | Synchronous",
      "Используйте s!help чтобы увидеть команды. | Synchronous",
      "Verwenden Sie s!help, um die Befehle anzuzeigen. | Synchronous",
      "Usa s!help per visualizzare i comandi. | Synchronous",
    ];
    let result = array[Math.floor(Math.random() * array.length)];
    return result;
  },
};

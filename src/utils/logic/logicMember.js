module.exports = {
  generateXP: function (memberBoost) {
    return Math.ceil(Math.random() * 30) * memberBoost;
  },
  generateRolePlayXP: function (memberBoost) {
    return Math.ceil(Math.random() * 320) * memberBoost;
  },
  limitLevel: function (xp, level) {
    const BASE = 10;
    let limit = Math.floor(BASE * level * Math.pow(Math.E, level));
    while (xp >= limit) {
      level++;
      limit = Math.floor(BASE * level * Math.pow(Math.E, level));
    }
    return level;
  },
  limit: function (xp, level) {
    const BASE = 10;
    const limit = Math.floor(BASE * level * Math.pow(Math.E, level));
    return limit;
  },
};

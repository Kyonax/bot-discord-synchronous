//Importación de la Conexión con la Base de Datos
const StateManager = require("../database/StateManager");
//Exportación de las Funciones
module.exports = {
  members: async function (guildID) {
    return StateManager.connection.query(
      `SELECT * FROM GuildMembers WHERE guildID='${guildID}'`
    );
  },
  memberExist: async function (guildID, memberID) {
    return StateManager.connection.query(
      `SELECT * FROM GuildMembers WHERE guildID='${guildID}' AND memberID='${memberID}'`
    );
  },
  memberBankExist: async function (guildID, memberID) {
    return StateManager.connection.query(
      `SELECT * FROM GuildBank WHERE guildID='${guildID}' AND memberID='${memberID}'`
    );
  },
  memberRolePlayExist: async function (guildID, memberID) {
    return StateManager.connection.query(
      `SELECT * FROM RolePlayMembers WHERE guildID='${guildID}' AND memberID='${memberID}'`
    );
  },
  getMembers: async function (guildID) {
    return StateManager.connection.query(
      `SELECT * FROM GuildMembers WHERE guildID = '${guildID}'`
    );
  },
  insertMemberMap: async function (guildID, memberID, guildMembers, guilds) {
    let membersGuild = [];
    StateManager.connection
      .query(`SELECT * FROM GuildMembers WHERE guildID = '${guildID}'`)
      .then((result) => {
        const member = result[0];
        member.forEach((memb) => {
          guildMembers.set(memb.memberID, {
            memberID: memb.memberID,
            guildID: memb.guildID,
            memberLanguage: memb.memberLanguage,
            adminMember: memb.adminMember,
            inmortalMember: memb.inmortalMember,
            moderatorMember: memb.moderatorMember,
            serverRank: memb.serverRank,
            memberXP: memb.memberXP,
            memberLevel: memb.memberLevel,
            memberBoost: memb.memberBoost,
            boostMemberTime: memb.boostMemberTime,
            warnings: memb.warnings,
          });
          if (guildMembers.get(memb.memberID).guildID === guildID) {
            membersGuild.push(guildMembers.get(memb.memberID));
          }
          StateManager.emit(
            "membersUpdate",
            membersGuild,
            memb.guildID,
            memb.memberID,
            memb.memberLanguage,
            memb.adminMember,
            memb.inmortalMember,
            memb.moderatorMember,
            memb.serverRank,
            memb.memberXP,
            memb.memberLevel,
            memb.memberBoost,
            memb.boostMemberTime,
            memb.warnings
          );
        });
        guildMembers.set(memberID, {
          memberID: memberID,
          guildID: guildID,
          memberLanguage: "es",
          adminMember: "0",
          inmortalMember: "0",
          moderatorMember: "0",
          serverRank: 0,
          memberXP: 0,
          memberLevel: 1,
          memberBoost: 1,
          boostMemberTime: 0,
          warnings: 0,
        });
        if (guildMembers.get(memberID).guildID === guildID) {
          membersGuild.push(guildMembers.get(memberID));
        }
        guilds.set(guildID, {
          Member: membersGuild,
        });
        StateManager.emit(
          "membersUpdate",
          membersGuild,
          guildID,
          memberID,
          "es",
          "0",
          "0",
          "0",
          0,
          0,
          1,
          1,
          0,
          0
        );
      });
  },
  insertBankMemberMap: async function (
    guildID,
    memberID,
    guildMembersBank,
    bankGuilds
  ) {
    let membersBank = [];
    StateManager.connection
      .query(`SELECT * FROM GuildBank WHERE guildID = '${guildID}'`)
      .then((result) => {
        const member = result[0];
        member.forEach((memb) => {
          guildMembersBank.set(memb.memberID, {
            memberID: memb.memberID,
            guildID: memb.guildID,
            memberCoins: memb.memberCoins,
          });
          if (guildMembersBank.get(memb.memberID).guildID === guildID) {
            membersBank.push(guildMembersBank.get(memb.memberID));
          }
          StateManager.emit(
            "bankMembersUpdate",
            membersBank,
            memb.guildID,
            memb.memberID,
            memb.memberCoins
          );
        });
        guildMembersBank.set(memberID, {
          memberID: memberID,
          guildID: guildID,
          memberCoins: 0,
        });
        if (guildMembersBank.get(memberID).guildID === guildID) {
          membersBank.push(guildMembersBank.get(memberID));
        }
        bankGuilds.set(guildID, {
          Member: membersBank,
        });
        StateManager.emit(
          "bankMembersUpdate",
          membersBank,
          guildID,
          memberID,
          0
        );
      });
  },
  insertRolePlayMemberMap: async function (
    guildID,
    memberID,
    rolePlayMembers,
    guildsRolePlay,
    gameRolePlay
  ) {
    let membersGuild = [];
    StateManager.connection
      .query(`SELECT * FROM RolePlayMembers WHERE guildID = '${guildID}'`)
      .then((result) => {
        const member = result[0];
        member.forEach((memb) => {
          rolePlayMembers.set(memb.memberID, {
            memberID: memb.memberID,
            guildID: memb.guildID,
            gameRolePlay: memb.gameRolePlay,
            rolePlayRank: memb.rolePlayRank,
            memberXP: memb.memberXP,
            memberLevel: memb.memberLevel,
            memberAge: memb.memberAge,
            memberRespect: memb.memberRespect,
            memberWork: memb.memberWork,
            memberRelation: memb.memberRelation,
            memberBiography: memb.memberBiography,
          });
          if (rolePlayMembers.get(memb.memberID).guildID === guildID) {
            membersGuild.push(rolePlayMembers.get(memb.memberID));
          }
          StateManager.emit(
            "membersRolePlayUpdate",
            membersGuild,
            memb.guildID,
            memb.memberID,
            memb.gameRolePlay,
            memb.rolePlayRank,
            memb.memberXP,
            memb.memberLevel,
            memb.memberAge,
            memb.memberRespect,
            memb.memberWork,
            memb.memberRelation,
            memb.memberBiography
          );
        });
        rolePlayMembers.set(memberID, {
          memberID: memberID,
          guildID: guildID,
          gameRolePlay: gameRolePlay,
          rolePlayRank: 0,
          memberXP: 0,
          memberLevel: 1,
          memberAge: 18,
          memberRespect: 0,
          memberWork: "**Vago**",
          memberRelation: "Soltero/a",
          memberBiography: "None Biography Information",
        });
        if (rolePlayMembers.get(memberID).guildID === guildID) {
          membersGuild.push(rolePlayMembers.get(memberID));
        }
        guildsRolePlay.set(guildID, {
          Member: membersGuild,
        });
        StateManager.emit(
          "membersRolePlayUpdate",
          membersGuild,
          guildID,
          memberID,
          gameRolePlay,
          0,
          0,
          1,
          18,
          0,
          "**Vago**",
          "Soltero/a",
          "None Biography Information"
        );
      });
  },
  insertMember: async function (guildID, memberID) {
    return StateManager.connection.query(
      `INSERT INTO GuildMembers VALUES('${guildID}','${memberID}',DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT)`
    );
  },
  insertMemberBank: async function (guildID, memberID) {
    return StateManager.connection.query(
      `INSERT INTO GuildBank VALUES('${guildID}','${memberID}',0)`
    );
  },
  insertRolePlayMember: async function (guildID, memberID, gameRolePlay) {
    return StateManager.connection.query(
      `INSERT INTO RolePlayMembers VALUES('${guildID}','${memberID}','${gameRolePlay}',DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT)`
    );
  },
  insertMemberBans: async function (
    guildID,
    memberID,
    memberTag,
    memberJoinedAt,
    autorBan
  ) {
    return StateManager.connection.query(
      `INSERT INTO GuildBans VALUES('${guildID}','${memberID}','${memberTag}','${memberJoinedAt}','${autorBan}')`
    );
  },
  deleteMemberBank: async function (guildID, memberID) {
    return StateManager.connection.query(
      `DELETE FROM GuildBank WHERE guildID='${guildID}' AND memberID='${memberID}'`
    );
  },
  deleteMember: async function (guildID, memberID) {
    return StateManager.connection.query(
      `DELETE FROM GuildMembers WHERE guildID='${guildID}' AND memberID='${memberID}'`
    );
  },
  deleteMemberRolePlay: async function (guildID, memberID) {
    return StateManager.connection.query(
      `DELETE FROM RolePlayMembers WHERE guildID='${guildID}' AND memberID='${memberID}'`
    );
  },
  updateGuildMemberXP: function (guildID, memberID, memberXP, memberLevel) {
    return StateManager.connection.query(
      `UPDATE GuildMembers SET memberXP='${memberXP}', memberLevel='${memberLevel}' WHERE guildID='${guildID}' AND memberID='${memberID}'`
    );
  },
  updateGuildRolePlayMemberXP: function (
    guildID,
    memberID,
    memberXP,
    memberLevel
  ) {
    return StateManager.connection.query(
      `UPDATE RolePlayMembers SET memberXP='${memberXP}', memberLevel='${memberLevel}' WHERE guildID='${guildID}' AND memberID='${memberID}'`
    );
  },
  updateGuildServerRank: function (guildID, memberID, serverRank) {
    return StateManager.connection.query(
      `UPDATE GuildMembers SET serverRank='${serverRank}' WHERE guildID='${guildID}' AND memberID='${memberID}'`
    );
  },
  updateGuildRolePlayRank: function (guildID, memberID, rolePlayRank) {
    return StateManager.connection.query(
      `UPDATE RolePlayMembers SET rolePlayRank='${rolePlayRank}' WHERE guildID='${guildID}' AND memberID='${memberID}'`
    );
  },
  updateGuildRolePlayAge: function (guildID, memberID, memberAge) {
    return StateManager.connection.query(
      `UPDATE RolePlayMembers SET memberAge='${memberAge}' WHERE guildID='${guildID}' AND memberID='${memberID}'`
    );
  },
  updateGuildRolePlayBio: function (guildID, memberID, memberBiography) {
    return StateManager.connection.query(
      `UPDATE RolePlayMembers SET memberBiography='${memberBiography}' WHERE guildID='${guildID}' AND memberID='${memberID}'`
    );
  },
  updateGuildRolePlayRep: function (guildID, memberID, memberRespect) {
    return StateManager.connection.query(
      `UPDATE RolePlayMembers SET memberRespect='${memberRespect}' WHERE guildID='${guildID}' AND memberID='${memberID}'`
    );
  },
  updateGuildRolePlayWork: function (guildID, memberID, memberWork) {
    return StateManager.connection.query(
      `UPDATE RolePlayMembers SET memberWork='${memberWork}' WHERE guildID='${guildID}' AND memberID='${memberID}'`
    );
  },
  updateGuildAdminMember: function (guildID, memberID, adminMember) {
    return StateManager.connection.query(
      `UPDATE GuildMembers SET adminMember='${adminMember}' WHERE guildID='${guildID}' AND memberID='${memberID}'`
    );
  },
  updateGuildLevel: function (guildID, memberID, memberLevel, memberXP) {
    return StateManager.connection.query(
      `UPDATE GuildMembers SET memberLevel='${memberLevel}', memberXP='${memberXP}' WHERE guildID='${guildID}' AND memberID='${memberID}'`
    );
  },
  updateGuildInmortalMember: function (guildID, memberID, inmortalMember) {
    return StateManager.connection.query(
      `UPDATE GuildMembers SET inmortalMember='${inmortalMember}' WHERE guildID='${guildID}' AND memberID='${memberID}'`
    );
  },
  updateGuildModeratorMember: function (guildID, memberID, moderatorMember) {
    return StateManager.connection.query(
      `UPDATE GuildMembers SET moderatorMember='${moderatorMember}' WHERE guildID='${guildID}' AND memberID='${memberID}'`
    );
  },
  updateGuildMemberBoost: function (
    guildID,
    memberID,
    memberBoost,
    boostMemberTime
  ) {
    return StateManager.connection.query(
      `UPDATE GuildMembers SET memberBoost='${memberBoost}', boostMemberTime='${boostMemberTime}' WHERE guildID='${guildID}' AND memberID='${memberID}'`
    );
  },
  updateGuildBankCoins: function (guildID, memberID, memberCoins) {
    return StateManager.connection.query(
      `UPDATE GuildBank SET memberCoins='${memberCoins}' WHERE guildID='${guildID}' AND memberID='${memberID}'`
    );
  },
  updateGuildMemberWarns: function (guildID, memberID, warnings) {
    return StateManager.connection.query(
      `UPDATE GuildMembers SET warnings='${warnings}' WHERE guildID='${guildID}' AND memberID='${memberID}'`
    );
  },
};

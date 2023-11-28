const { insertCsDao } = require("../models/csDao");

const insertCsService = async (title, content, userId) => {
  return await insertCsDao(title, content, userId);
};

module.exports = { insertCsService };

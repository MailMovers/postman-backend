const { AppDataSource } = require("./dataSource");

const insertCsDao = async (title, content, userId) => {
  const insertCs = await AppDataSource.query(
    `
    INSERT INTO customer_service
    (title, content, user_id)
    VALUES
    (?,?,?)
    `,
    [title, content, userId]
  );
  return insertCs;
};

module.exports = { insertCsDao };

const { AppDataSource } = require("./dataSource");

const insertProductDao = async (
  name,
  img_url,
  price,
  add_price,
  discription
) => {
  const insertProduct = await AppDataSource.query(
    `
        INSERT INTO writing_pads
        (name,img_url,price,add_price,discription)
        VALUES
        (?,?,?,?,?)
        `,
    [name, img_url, price, add_price, discription]
  );
  return insertProduct;
};

const getUserByIdDao = async (userId) => {
  const result = await AppDataSource.query(
    `
    SELECT 
    users.id AS user_id,
    users.role_id AS user_role_id,
    roles.id AS role_id
  FROM users
  LEFT JOIN roles ON roles.id = users.role_id
  WHERE users.id = ?;

    `,
    [userId]
  );
  const user = result[0];
  console.log("dao", result);
  return user;
};

module.exports = {
  insertProductDao,
  getUserByIdDao,
};

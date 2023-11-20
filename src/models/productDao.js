const { AppDataSource } = require("./dataSource");
//상품 등록
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
//어드민인지 확인
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
//상품 삭제
const deleteProductDao = async (productId) => {
  const deleteProduct = await AppDataSource.query(
    `
    DELETE FROM writing_pads WHERE id = ?
    `,
    [productId]
  );
  return deleteProduct;
};
//상품 정보 불러오기
const getProductDao = async (productId) => {
  const getProduct = await AppDataSource.query(
    `
    SELECT
      id,
      name,
      img_url,
      price,
      add_price,
      discription
    FROM
      writing_pads
    WHERE
      writing_pads.id = ?;
    `,
    [productId]
  );
  return getProduct;
};
//상품 상세정보 가져오기
const getProductListDao = async (startItem, pageSize) => {
  const productList = await AppDataSource.query(
    `
    SELECT
      name,
      img_url,
      price,
      add_price,
      discription
    FROM
      writing_pads
    LIMIT ? OFFSET ?;
    `,
    [pageSize, startItem]
  );
  return productList;
};

module.exports = {
  insertProductDao,
  getUserByIdDao,
  deleteProductDao,
  getProductDao,
  getProductListDao,
};

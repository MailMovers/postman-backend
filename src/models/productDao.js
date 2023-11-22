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

const getUserByReviewDao = async (userId) => {
  const resultUser = await AppDataSource.query(
    `
    SELECT
    u.id AS userId,
    o.status AS orderStatus,
    wp.id AS writing_pad_id
   FROM users u
   LEFT JOIN orders o ON o.user_id = u.id
   LEFT JOIN letters l ON l.id = o.letter_id
   LEFT JOIN writing_pads wp ON wp.id = l.writing_pad_id 
   WHERE o.status = "delivery completed" AND u.id = ?
  `,
    [userId]
  );
  ç;
  const user = resultUser[0];
  return user;
};

const insertReviewDao = async (userId, productId, score, content) => {
  const insertReview = await AppDataSource.query(
    `
    INSERT INTO reviews
    (
    user_id,
    writing_pad_id,
    score,
    content
    )
    VALUES
    (?,?,?,?)
    `,
    [userId, productId, score, content]
  );
  return insertReview;
};

//상품리뷰 불러오기
const getReviewDao = async (startItem, pageSize, postId) => {
  const getReview = await AppDataSource.query(
    `
    SELECT
      id,
      user_id,
      content,
      score,
      created_at,
      deleted_at
    FROM
      reviews
    WHERE
      writing_pad_id = ?
    ORDER BY
      created_at DESC
    LIMIT ? OFFSET ?;
  `,
    [postId, pageSize, startItem]
  );
  return getReview;
};

//상품 리뷰 지우기
const deleteReviewDao = async (userId, reviewId) => {
  const deleteReview = await AppDataSource.query(
    `
    UPDATE reviews
    SET reviews.deleted_at = NOW()
    WHERE reviews.user_id = ? AND reviews.id = ?;
    `,
    [userId, reviewId]
  );
  return deleteReview;
};

module.exports = {
  insertProductDao,
  getUserByIdDao,
  deleteProductDao,
  getProductDao,
  getProductListDao,
  getUserByReviewDao,
  insertReviewDao,
  getReviewDao,
  deleteReviewDao,
};

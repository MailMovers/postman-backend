const { AppDataSource } = require("./dataSource");
//상품 등록
const insertProductDao = async (
  name,
  imgUrl,
  padImgUrl,
  price,
  addPrice,
  description
) => {
  const insertProduct = await AppDataSource.query(
    `
        INSERT INTO writing_pads
        (name,img_url,pad_img_url,price,add_price,description)
        VALUES
        (?,?,?,?,?,?)
        `,
    [name, imgUrl, padImgUrl, price, addPrice, description]
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
  try {
    const deleteProduct = await AppDataSource.query(
      `
      UPDATE writing_pads SET writing_pads.deleted_at = NOW()
      WHERE writing_pads.id = ?
      `,
      [productId]
    );
    return deleteProduct;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

//상품 상세정보 불러오기
const getProductDao = async (productId) => {
  const getProduct = await AppDataSource.query(
    `
    SELECT
      id,
      name,
      img_url,
      price,
      add_price,
      description
    FROM
      writing_pads
    WHERE
      writing_pads.id = ?;
    `,
    [productId]
  );
  return getProduct;
};
//상품 리스트 가져오기
const getProductListDao = async (startItem, pageSize) => {
  try {
    const productList = await AppDataSource.query(
      `
      SELECT
        name,
        img_url,
        price,
        add_price,
        description,
        deleted_at
      FROM
        writing_pads
      WHERE
        deleted_at IS NULL
      LIMIT ? OFFSET ?;
      `,
      [pageSize, startItem]
    );
    return productList;
  } catch (error) {
    console.error("getProductListDao에서 오류:", error);
    throw error; // 이 부분에서 오류를 다시 throw하여 상위에서 처리할 수 있도록 함
  }
};
//리뷰 작성가능한 유저확인
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
   WHERE o.status = "done" AND u.id = ?
  `,
    [userId]
  );
  const user = resultUser[0];
  return user;
};
//리뷰작성
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
const getReviewDao = async (startItem, pageSize, productId) => {
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
    [productId, pageSize, startItem]
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
//편지지 이미지 불러오기
const getWritingPadDao = async (productId) => {
  const writingPad = await AppDataSource.query(
    `
    SELECT
      pad_img_url
    FROM writing_pads
    WHERE id = ?
    `,
    [productId]
  );
  return writingPad;
};
//편지지 숫자
const getCountProductListDao = async () => {
  try {
    const writingPadCountQuery = `
      SELECT COUNT(*) AS count FROM writing_pads WHERE deleted_at IS NULL
    `;
    const resultCount = await AppDataSource.query(writingPadCountQuery);

    // resultCount가 배열 형태일 경우 첫 번째 요소를 사용
    const count = resultCount[0]?.count || 0;

    return { count };
  } catch (error) {
    console.error("getCountProductListDao 오류:", error);
    throw error; // 에러를 다시 throw하여 상위에서 처리할 수 있도록 함
  }
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
  getWritingPadDao,
  getCountProductListDao,
};

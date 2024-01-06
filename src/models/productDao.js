const { AppDataSource } = require("./dataSource");
//상품 등록
const insertProductDao = async (
  name,
  imgUrl1,
  imgUrl2,
  imgUrl3,
  imgUrl4,
  imgUrl5,
  descriptionImgUrl,
  padImgUrl,
  price,
  addPrice,
  description,
  category
) => {
  const insertProduct = await AppDataSource.query(
    `
        INSERT INTO writing_pads
        (
          name, 
          img_url_1,
          img_url_2,
          img_url_3,
          img_url_4,
          img_url_5,
          description_img_url,
          pad_img_url,
          price,add_price,
          description,
          category
          )
        VALUES
        (?,?,?,?,?,?,?,?,?,?,?)
        `,
    [
      name,
      imgUrl1,
      imgUrl2,
      imgUrl3,
      imgUrl4,
      imgUrl5,
      descriptionImgUrl,
      padImgUrl,
      price,
      addPrice,
      description,
      category,
    ]
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
  try {
    const getProductQuery = `
      SELECT
        id,
        name,
        description_img_url,
        price,
        add_price,
        description,
        category
      FROM
        writing_pads
      WHERE
        writing_pads.id = ?;
    `;

    const imgUrlQuery = `
      SELECT 
        img_url_1,
        img_url_2,
        img_url_3,
        img_url_4,
        img_url_5
      FROM
        writing_pads
      WHERE
        writing_pads.id = ?;
    `;

    // 각각의 쿼리를 병렬로 실행
    const [productResult, imgUrlResult] = await Promise.all([
      AppDataSource.query(getProductQuery, [productId]),
      AppDataSource.query(imgUrlQuery, [productId]),
    ]);

    // 결과를 객체로 정리
    const productInfo = productResult[0] || null;
    const imgUrls = imgUrlResult[0] || null;

    // imgUrls를 배열로 변환
    const imgUrlsArray = Object.entries(imgUrls).map(([key, value]) => ({
      [key]: value,
    }));

    return {
      productInfo,
      imgUrls: imgUrlsArray,
    };
  } catch (error) {
    console.error("getProductDao에서 오류:", error);
    throw error;
  }
};

//상품 리스트 가져오기
const getProductListDao = async (startItem, pageSize) => {
  try {
    const productList = await AppDataSource.query(
      `
      SELECT
        id,
        name,
        img_url_1,
        price,
        add_price,
        description,
        category,
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
//리뷰 데이터카운트
const getReviewCountDao = async (productId) => {
  try {
    const getReviewCountQuery = `
      SELECT COUNT(*) AS count FROM reviews WHERE writing_pad_id = ? AND deleted_at IS NULL
    `;
    const resultCount = await AppDataSource.query(getReviewCountQuery, [
      productId,
    ]);

    const count = resultCount[0]?.count || 0;

    return { count };
  } catch (error) {
    console.error("getReviewCountDao에서 발생한 오류", error);
    throw error;
  }
};
//상품 리뷰 지우기
const deleteMyReviewDao = async (userId, reviewId, productId) => {
  const deleteReview = await AppDataSource.query(
    `
    UPDATE reviews
    SET reviews.deleted_at = NOW()
    WHERE reviews.user_id = ? AND reviews.id = ? AND writing_pad_Id = ?
    `,
    [userId, reviewId, productId]
  );
  return deleteReview;
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

    // resultCount가 배열 형태일 경우 첫 번째 요소를 사용ㅊ
    const count = resultCount[0]?.count || 0;

    return { count };
  } catch (error) {
    console.error("getCountProductListDao 오류:", error);
    throw error; // 에러를 다시 throw하여 상위에서 처리할 수 있도록 함
  }
};
//카테고리 별로 편지지 리스트를 불러옵니다.
const getCategoryListWithCountDao = async (startItem, pageSize, category) => {
  try {
    const productListQuery = `
      SELECT
        id,
        name,
        img_url_1,
        price,
        add_price,
        description,
        category,
        deleted_at
      FROM
        writing_pads
      WHERE
        deleted_at IS NULL AND category = ?
      LIMIT ? OFFSET ?;
    `;
    const countQuery = `
      SELECT COUNT(*) AS count FROM writing_pads WHERE deleted_at IS NULL AND category = ?;
    `;

    // 동시에 실행할 쿼리 배열
    const queries = [productListQuery, countQuery];

    // 쿼리 실행 및 결과를 배열로 받음
    const [productList, countResult] = await Promise.all([
      AppDataSource.query(productListQuery, [category, pageSize, startItem]),
      AppDataSource.query(countQuery, [category]),
    ]);

    // 결과 반환
    return {
      productList,
      count: countResult[0]?.count || 0,
    };
  } catch (error) {
    console.error("getCategoryListWithCountDao에서 오류:", error);
    throw error;
  }
};
const getReviewListDao = async (startItem, pageSize, userId) => {
  try {
    const myReviewCountQuery = `
      SELECT COUNT(*) AS count FROM reviews WHERE writing_pad_id = ? AND deleted_at IS NULL
    `;
    const getReviewListQuery = `
      SELECT
        reviews.writing_pad_id,
        writing_pads.name AS writingPadName,
        writing_pads.img_url_1,
        reviews.id AS reviewId,
        reviews.user_id,
        reviews.score,
        reviews.content,
        reviews.created_at AS review_created_at,
        writing_pads.deleted_at AS writing_pads_deleted_at,
        reviews.deleted_at AS review_deleted_at
      FROM reviews
      LEFT JOIN writing_pads ON reviews.writing_pad_id = writing_pads.id
      WHERE 
        reviews.deleted_at IS NULL AND 
        writing_pads.deleted_at IS NULL AND
        reviews.user_id = ?
      ORDER BY
        reviews.created_at DESC
      LIMIT ? OFFSET ?;
    `;

    const [countResult, getReviewListResult] = await Promise.all([
      AppDataSource.query(myReviewCountQuery, [userId]),
      AppDataSource.query(getReviewListQuery, [userId, pageSize, startItem]),
    ]);

    return {
      count: countResult[0]?.count || 0,
      getReviewList: getReviewListResult,
    };
  } catch (err) {
    console.error("getReviewListDao에서 오류:", err);
    throw err;
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
  getCategoryListWithCountDao,
  getReviewListDao,
  getReviewCountDao,
  deleteMyReviewDao,
};

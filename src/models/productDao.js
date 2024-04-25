const { assert } = require("console");
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
  category,
  descriptionId
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
          price,
          add_price,
          description,
          category,
          letter_detail_id
          )
        VALUES
        (?,?,?,?,?,?,?,?,?,?,?,?,?)
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
      descriptionId,
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
    writing_pads.id,
    writing_pads.name,
    writing_pads.description_img_url,
    writing_pads.price,
    writing_pads.add_price,
    writing_pads.description,
    writing_pads.category,
    letter_detail.id AS writing_pad_detail_id,
    letter_detail.name AS writing_pad_detail_name,
    letter_detail.common AS writing_pad_detail_common,
    letter_detail.extra AS writing_pad_detail_extra, 
    letter_detail.envelope AS writing_pad_detail_envelope,
    letter_detail.writing_pad_info AS writing_pad_detail_info,
    letter_detail.picture AS writing_pad_detail_picture
  FROM
    writing_pads
  LEFT JOIN letter_detail ON writing_pads.letter_detail_id = letter_detail.id
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
const getUserByReviewDao = async (letterId) => {
  const resultUser = await AppDataSource.query(
    `
    SELECT
    user.id AS userId,
    orderT.status AS orderStatus,
    writing_pad.id AS writing_pad_id
   FROM users user
   LEFT JOIN orders orderT ON orderT.user_id = user.id
   LEFT JOIN letters letter ON letter.id = orderT.letter_id
   LEFT JOIN writing_pads writing_pad ON writing_pad.id = letter.writing_pad_id 
   WHERE orderT.status = "DONE" AND letter.id = ?
  `,
    [letterId]
  );
  const user = resultUser[0];
  return user;
};
//리뷰작성
const insertReviewDao = async (userId, productId, score, content, letterId) => {
  const insertReview = await AppDataSource.query(
    `
    INSERT INTO reviews
    (
    user_id,
    writing_pad_id,
    score,
    content,
    letter_id,
    status
    )
    VALUES
    (?,?,?,?,?,?)
    `,
    [userId, productId, score, content, letterId, "DONE"]
  );
  return insertReview;
};

const getReviewDao = async (startItem, pageSize, productId) => {
  try {
    const getReviewQuery = `
      SELECT
        reviews.id,
        reviews.user_id,
        users.name,
        reviews.content,
        reviews.score,
        reviews.created_at,
        reviews.deleted_at
      FROM
        reviews
      LEFT JOIN
        users ON reviews.user_id = users.id
      WHERE
        reviews.deleted_at IS NULL
        AND writing_pad_id = ?
      ORDER BY
        created_at DESC
      LIMIT ? OFFSET ?;
    `;

    const scoreQuery = `
      SELECT ROUND(AVG(reviews.score), 1) AS average_score
      FROM reviews
      WHERE deleted_at IS NULL AND writing_pad_id = ?
    `;

    const getReviewCountQuery = `
      SELECT COUNT(*) AS count FROM reviews WHERE writing_pad_id = ? AND deleted_at IS NULL
    `;

    const [reviewResult, scoreResult, countResult] = await Promise.all([
      AppDataSource.query(getReviewQuery, [productId, pageSize, startItem]),
      AppDataSource.query(scoreQuery, [productId]),
      AppDataSource.query(getReviewCountQuery, [productId]),
    ]);

    return {
      reviewResult,
      score: scoreResult[0]?.average_score || 0,
      count: countResult[0]?.count || 0,
    };
  } catch (err) {
    console.error("getReviewDao에서 발생한 에러", err);
    throw err;
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

const newProductDao = async () => {
  try {
    const result = await AppDataSource.query(`
      SELECT id, img_url_1, name, description
      FROM writing_pads
      ORDER BY created_at DESC
      LIMIT 4
  `);
    return result;
  } catch (err) {
    console.error("newProductDao에서 오류:", err);
    throw err;
  }
};
const popularProductDao = async () => {
  try {
    const result = await AppDataSource.query(`
    SELECT wp.id, wp.img_url_1, wp.name, wp.description
      FROM writing_pads wp
      INNER JOIN (
        SELECT writing_pad_id, COUNT(*) as review_count
        FROM reviews
        GROUP BY writing_pad_id
      ) as r ON wp.id = r.writing_pad_id
      ORDER BY r.review_count DESC
      LIMIT 4
    `);
    return result;
  } catch (err) {
    console.error("popularProductDao에서 오류:", err);
    throw err;
  }
};

const getMainReviewsDao = async () => {
  try {
    const result = await AppDataSource.query(`
    SELECT 
    r.id , r.content , r.score, wp.img_url_1 AS img_url
    FROM reviews r, writing_pads wp 
    WHERE r.writing_pad_id = wp.id 
    ORDER BY score  DESC
    LIMIT 4;
    `);
    return result
  } catch (err) {
    console.error("getMainReviewsDao에서 오류:", err);
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
  newProductDao,
  popularProductDao,
  deleteMyReviewDao,
  getMainReviewsDao,
};

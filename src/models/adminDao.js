const { AppDataSource } = require("./dataSource");
//어드민 상품수정
const upDateProductDao = async (
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
  productId
) => {
  try {
    const updateProduct = await AppDataSource.query(
      `
          UPDATE writing_pads 
          SET name = ?,
          img_url_1 = ?,
          img_url_2 = ?, 
          img_url_3 = ?, 
          img_url_4 = ?, 
          img_url_5 = ?, 
          description_img_url =?, 
          pad_img_url = ?, 
          price = ?, 
          add_price = ?, 
          description = ?, 
          category = ?
          WHERE id = ?
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
        productId,
      ]
    );
    return updateProduct;
  } catch (error) {
    console.error("Error update product:", error);
    throw error;
  }
};

const getLettersInfoDao = async () => {
  try {
    const result = await AppDataSource.query(
      `
      SELECT 
        letters.id AS letterId, 
        writing_pads.name, 
        letters.page, 
        letters.photo_count,
        letters.status,
        MAX(orders.created_at) AS latestOrderCreatedAt
      FROM 
        letters
      JOIN 
        orders ON letters.id = orders.letter_id
      JOIN 
        writing_pads ON letters.writing_pad_id = writing_pads.id
        WHERE 
        orders.status = 'done'
        AND orders.created_at > CURDATE() - INTERVAL 1 DAY + INTERVAL 17 HOUR
        AND orders.created_at <= CURDATE() + INTERVAL 17 HOUR
      GROUP BY 
        letters.id, writing_pads.name, letters.page, letters.photo_count, letters.status
      ORDER BY 
        latestOrderCreatedAt ASC
      `
    );
    return result;
  } catch (err) {
    console.error("getLettersInfo에서 발생한 오류", err);
    throw err;
  }
};

const getLettersByDateTimeRangeDao = async (startDate, endDate) => {
  try {
    const result = await AppDataSource.query(
      `
      SELECT 
        letters.id AS letterId, 
        writing_pads.name, 
        letters.page, 
        letters.photo_count,
        letters.status,
        orders.created_at AS orderCreatedAt
      FROM 
        letters
      JOIN 
        orders ON letters.id = orders.letter_id
      JOIN 
        writing_pads ON letters.writing_pad_id = writing_pads.id
      WHERE 
        orders.created_at >= ? AND orders.created_at <= ?
      ORDER BY 
        orders.created_at ASC
      `,
      [startDate, endDate]
    );
    return result;
  } catch (err) {
    console.error("getLettersByDateTimeRange에서 발생한 오류", err);
    throw err;
  }
};

//보낸주소 받는주소 받기
const getLetterAddressDao = async (letterId) => {
  try {
    const LetterAddress = await AppDataSource.query(
      `
    SELECT
    letters.id,
    letters.user_id,
    send_address,
    send_address_detail,
    send_phone,
    send_name,
    delivery_address,
    delivery_address_detail,
    delivery_phone,
    delivery_name,
    orders.status
    FROM letters
    LEFT JOIN users ON letters.user_id = users.id
    LEFT JOIN send_address ON letters.send_address_id = send_address.id
    LEFT JOIN delivery_address ON letters.delivery_address_id = delivery_address.id
    LEFT JOIN orders ON orders.letter_id = letters.id
    WHERE orders.status = "done" AND letters.id = ?
    `,
      [letterId]
    );
    return LetterAddress;
  } catch (err) {
    console.error("getLetterAddress에서 발생한 오류", err);
    throw err;
  }
};
// 고객첨부 사진 불러오기
const getPhotoDao = async (letterId) => {
  try {
    const result = await AppDataSource.query(
      `
      SELECT img_url FROM photos WHERE letter_id = ?
      `,
      [letterId]
    );
    return result;
  } catch (err) {
    console.error("getPhotoDao에서 발생한 오류", err);
    throw err;
  }
};
// 고객작성 편지 내용 불러오기
const getLetterDao = async (letterId) => {
  try {
    const result = await AppDataSource.query(
      `
      SELECT 
        letters.id,
        letters.page,
        content.content,
        content.content_count
      FROM letters 
      JOIN content ON letters.id = content.letter_id
      WHERE letters.id = ?
      `,
      [letterId]
    );
    return result;
  } catch (err) {
    console.error("getLetterDao에서 발생한 오류", err);
    throw err;
  }
};
//공지사항 입력
const insertNoticeDao = async (title, content, userId) => {
  try {
    const insertNotice = await AppDataSource.query(
      `
        INSERT INTO notice
        (title, content, user_id)
        VALUES
        (?,?,?)
        `,
      [title, content, userId]
    );
    return insertNotice;
  } catch (err) {
    console.error("insertNoticeDao에서 발생한 에러", err);
    throw err;
  }
};

//공지사항 수정
const updateNoticeDao = async (title, content, postId) => {
  try {
    const updateNotice = await AppDataSource.query(
      `
        UPDATE notice
        SET title = ?, content = ?
        WHERE id = ?
        `,
      [title, content, postId]
    );
    return updateNotice;
  } catch (err) {
    console.error("updateNoticeDao에서 발생한 오류", err);
    throw err;
  }
};

//공지사항 글 상세 불러오기
const getNoticeDetailDao = async (postId) => {
  try {
    const noticeDetail = await AppDataSource.query(
      `
            SELECT
            id,
            title,
            content,
            created_at,
            deleted_at
            FROM 
            notice
            WHERE id = ? AND deleted_at IS NULL
            `,
      [postId]
    );
    return noticeDetail;
  } catch (err) {
    console.error("getNoticeDetailDao에서 발생한 오류", err);
    throw err;
  }
};
//공지사항 목록 불러오기
const getNoticeListDao = async (startItem, pageSize) => {
  try {
    const noticeListQuery = `
            SELECT
            id,
            title,
            created_at,
            deleted_at
            FROM
            notice
            WHERE deleted_at IS NULL
            LIMIT ? OFFSET ?;
            `;

    const countQuery = `
    SELECT COUNT(*) AS count FROM notice WHERE deleted_at IS NULL
    `;

    const [listResult, countResult] = await Promise.all([
      AppDataSource.query(noticeListQuery, [pageSize, startItem]),
      AppDataSource.query(countQuery),
    ]);

    // 데이터 구조에 따라 count 값을 올바르게 추출하기 위한 수정
    const totalCount = countResult[0]["count"] || 0; // 이 부분을 수정

    return {
      count: totalCount,
      list: listResult,
    };
  } catch (err) {
    console.error("getNoticeListDao에서 발생한 오류", err);
    throw err;
  }
};

//공지사항 게시글 삭제
const deleteNoticeDao = async (postId) => {
  try {
    const deleteNotice = await AppDataSource.query(
      `
            UPDATE notice
            SET deleted_at = NOW()
            WHERE id = ?
            `,
      [postId]
    );
    return deleteNotice;
  } catch (err) {
    console.error("deleteNoticeDao에서 발생한 오류", err);
    throw err;
  }
};
//리뷰삭제
const adminDeleteReview = async (reviewId, productId) => {
  try {
    const reviewDelete = await AppDataSource.query(
      `
    UPDATE reviews SET deleted_at = NOW()
    WHERE id = ? AND writing_pad_id = ?
    `,
      [reviewId, productId]
    );
    return reviewDelete;
  } catch (err) {
    console.error("adminDeleteReview에서 발생한 에러", err);
    throw err;
  }
};

//상품 리뷰 불러오기
const getProductReviewListDao = async (productId) => {
  try {
    const getProductReviewList = await AppDataSource.query(
      `
  SELECT
  writing_pads.id AS writing_pad_id,
  writing_pads.name AS wp_name,
  writing_pads.deleted_at AS wp_deleted_at,
  reviews.id AS reviewId,
  reviews.content,
  reviews.created_at AS r_created_at,
  reviews.deleted_at AS r_deleted_at
FROM writing_pads
LEFT JOIN reviews ON reviews.writing_pad_id = writing_pads.id
WHERE reviews.deleted_at IS NULL AND writing_pads.deleted_at IS NULL AND writing_pads.id = ?
  `,
      [productId]
    );
    return getProductReviewList;
  } catch (err) {
    console.error("getProductReviewListDao에서 발생한 오류", err);
    throw err;
  }
};

//고객센터 게시글 내용 열람
const adminCsDetailDao = async (customerServiceId) => {
  try {
    const csDetail = await AppDataSource.query(
      `
      SELECT
      customer_service.id,
      customer_service.title,
      customer_service.content,
      customer_service.user_id,
      customer_service.created_at
  FROM customer_service
  WHERE customer_service.id = ? AND customer_service.deleted_at IS NULL;
      `,
      [customerServiceId]
    );

    if (!csDetail || csDetail.length === 0) {
      throw new Error("게시글을 찾을 수 없습니다");
    }
    return csDetail[0];
  } catch (err) {
    console.error("getCsDetailDao에서 발생한 에러", err);
    throw err;
  }
};

//고객센터 게시글 답변 불러오기
const getCsaListDao = async (customerServiceId) => {
  const csaList = await AppDataSource.query(
    `
    SELECT
    customer_service.id AS customer_service_id,
    cs_answer.id AS csa_id,
    cs_answer.content AS csa_content,
    cs_answer.user_id AS csa_user_id,
    cs_answer.created_at AS csa_created_at
    FROM cs_answer
    LEFT JOIN customer_service ON customer_service.id = cs_answer.customer_service_id
    WHERE customer_service.id = ? AND customer_service.deleted_at IS NULL
  `,
    [customerServiceId]
  );
  return csaList;
};

const insertRegistrationDao = async (numberOfRegistration, letterId) => {
  const result = await AppDataSource.query(
    `
    UPDATE letters
    SET registration_number = ?
    WHERE id = ?
  `,
    [numberOfRegistration, letterId]
  );
  return result;
};

const changeStatusDao = async (letterId) => {
  const result = await AppDataSource.query(
    `
    UPDATE letters
    SET status = "printed"
    WHERE id = ?
    `,
    [letterId]
  );
  return result;
};

module.exports = {
  upDateProductDao,
  getLetterAddressDao,
  insertNoticeDao,
  updateNoticeDao,
  getNoticeDetailDao,
  getNoticeListDao,
  deleteNoticeDao,
  adminDeleteReview,
  getProductReviewListDao,
  adminCsDetailDao,
  getCsaListDao,
  getPhotoDao,
  getLetterDao,
  getLettersInfoDao,
  insertRegistrationDao,
  changeStatusDao,
  getLettersByDateTimeRangeDao
};

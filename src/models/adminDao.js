const { AppDataSource } = require("./dataSource");
//어드민 상품수정
const upDateProductDao = async (
  productId,
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
  try {
    const updateProduct = await AppDataSource.query(
      `
          UPDATE writing_pads 
          SET name = ?,
          img_url_1 = ?,
          img_url_2 = ?, 
          img_url_3 = ?, 
          img_url_4 = ?, 
          img_url_5, 
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
const adminDeleteReview = async (reviewId) => {
  try {
    const reviewDelete = await AppDataSource.query(
      `
    UPDATE reviews SET deleted_at = NOW()
    WHERE id = ?
    `,
      [reviewId]
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
};

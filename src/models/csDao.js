const { AppDataSource } = require("./dataSource");

//문의하기
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

//답변달기
const insertCsAnswerDao = async (content, userId, customerServiceId) => {
  const insertCsA = await AppDataSource.query(
    `
    INSERT INTO cs_answer
    (content, user_id, customer_service_id)
    VALUES
    (?,?,?)
    `,
    [content, userId, customerServiceId]
  );
  return insertCsA;
};

const getCsDetailDao = async (userId, customerServiceId) => {
  try {
    const csDetail = await AppDataSource.query(
      `
      SELECT
      customer_service.id,
      customer_service.title,
      customer_service.content,
      customer_service.user_id,
      customer_service.created_at,
      cs_answer.id AS csa_id,
      cs_answer.content AS csa_content,
      cs_answer.user_id AS csa_user_id,
      cs_answer.created_at AS csa_created_at
  FROM customer_service
  LEFT JOIN cs_answer ON customer_service.id = cs_answer.id
  LEFT JOIN users ON customer_service.user_id = users.id
  WHERE users.id = ? AND customer_service.id = ? AND customer_service.deleted_at IS NULL;
      `,
      [userId, customerServiceId]
    );

    if (!csDetail || csDetail.length === 0) {
      throw new Error("게시글을 찾을 수 없습니다");
    }

    if (csDetail[0].user_id !== userId) {
      throw new Error("게시글 열람 권한이 없습니다");
    }

    return csDetail[0];
  } catch (err) {
    console.error("getCsDetailDao에서 발생한 에러", err);
    throw err;
  }
};

//고객센터 문의 리스트
const CsListDao = async (startItem, pageSize) => {
  try {
    const csList = await AppDataSource.query(
      `
        SELECT
        id,
        title,
        user_id,
        created_at,
        deleted_at
        FROM customer_service
        WHERE customer_service.deleted_at IS NULL
        ORDER BY
        created_at DESC 
        LIMIT ? OFFSET ?;
      `,
      [pageSize, startItem]
    );
    return csList;
  } catch (err) {
    console.error("CsListDao에서 생긴 오류", err);
    throw err;
  }
};
//답변 목록 불러오기
const getCsAlistDao = async (customerServiceId) => {
  const CsAlist = await AppDataSource.query(
    `
  SELECT
  cs_answer.id,
  cs_answer.content,
  cs_answer.user_id,
  cs_answer.created_at,
  cs_answer.deleted_at
  FROM cs_answer
  WHERE cs_answer.deleted_at IS NULL
  `,
    [customerServiceId]
  );
  return CsAlist;
};

//게시글 삭제
const deleteCsDao = async (userId, customerServiceId) => {
  try {
    // 사용자가 게시물을 작성한 사용자인지 확인하는 SELECT 쿼리
    const selectResult = await AppDataSource.query(
      `
      SELECT 
      customer_service.id,
      customer_service.user_id,
      users.id  
    FROM customer_service
    LEFT JOIN users ON customer_service.user_id = users.id
    WHERE customer_service.user_id = ? AND customer_service.id = ? AND customer_service.deleted_at IS NULL;
    
    `,
      [userId, customerServiceId]
    );
    // 게시물이 존재하지 않거나 삭제된 경우
    if (!selectResult || selectResult.length === 0) {
      throw new Error("게시물을 찾을 수 없습니다");
    }
    // 사용자가 게시물을 작성한 사용자가 아닌 경우
    if (selectResult[0].user_id !== userId) {
      throw new Error("삭제 권한이 없습니다");
    }
    // 사용자가 게시물을 작성한 사용자인 경우에만 UPDATE 쿼리 실행
    const updateResult = await AppDataSource.query(
      `
      UPDATE customer_service
      SET deleted_at = NOW()
      WHERE user_id = ? AND id = ?;
    `,
      [userId, customerServiceId]
    );
    // 수정된 행이 없는 경우
    if (updateResult.affectedRows === 0) {
      throw new Error("삭제할 게시물을 찾을 수 없습니다");
    }
    return updateResult; // 또는 필요한 정보 반환
  } catch (err) {
    console.error("deleteCsDao에서 발생한 에러", err);
    throw err;
  }
};

const adminDeleteCsDao = async (customerServiceId) => {
  const adminCsDelete = await AppDataSource.query(
    `
    UPDATE customer_service
    SET deleted_at = NOW()
    WHERE id = ?;

    `,
    [customerServiceId]
  );
  return adminCsDelete;
};

//어드민 답변 삭제
const adminDeleteCsAnswerDao = async (
  userId,
  csAnswerId,
  customerServiceId
) => {
  const deleteCsAnswer = await AppDataSource.query(
    `
    UPDATE cs_answer AS csa
    SET deleted_at = NOW()
    WHERE csa.user_id = ? AND id = ? AND customer_service_id = ?
    `,
    [userId, csAnswerId, customerServiceId]
  );
  return deleteCsAnswer;
};

module.exports = {
  insertCsDao,
  insertCsAnswerDao,
  getCsDetailDao,
  CsListDao,
  deleteCsDao,
  adminDeleteCsDao,
  adminDeleteCsAnswerDao,
  getCsAlistDao,
};

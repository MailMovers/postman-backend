const {
  insertCsDao,
  insertCsAnswerDao,
  getCsDetailDao,
  CsListDao,
  deleteCsDao,
  adminDeleteCsDao,
  adminDeleteCsAnswerDao,
  getCsAlistDao,
} = require("../models/csDao");
//문의하기
const insertCsService = async (title, content, userId) => {
  return await insertCsDao(title, content, userId);
};
//답변하기
const insertCsAnswerService = async (content, userId, customerServiceId) => {
  return await insertCsAnswerDao(content, userId, customerServiceId);
};
//게시물 상세정보 불러오기
const getCsDetailService = async (userId, customerServiceId) => {
  return await getCsDetailDao(userId, customerServiceId);
};
//게시물 목록 불러오기
const getCsListService = async (userId, startItem, pageSize) => {
  try {
    const csList = await CsListDao(userId, startItem, pageSize);
    return csList;
  } catch (err) {
    console.error("getCsListService에서 생긴 오류", err);
    throw err;
  }
};
//게시글 삭제하기
const deleteCsService = async (userId, customerServiceId) => {
  return await deleteCsDao(userId, customerServiceId);
};
//어드민 게시글 삭제하기
const adminDeleteCsService = async (userId, customerServiceId) => {
  return await adminDeleteCsDao(userId, customerServiceId);
};
//어드민 답변 삭제
const adminDeleteCsAnswerService = async (
  userId,
  csAnswerId,
  customerServiceId
) => {
  try {
    const result = await adminDeleteCsAnswerDao(
      userId,
      csAnswerId,
      customerServiceId
    );
    return result;
  } catch (err) {
    console.error("", err);
    throw err;
  }
};
const getCsAnswerListService = async (customerServiceId) => {
  try {
    const csAnswerList = await getCsAlistDao(customerServiceId);
    return csAnswerList;
  } catch (err) {
    console.error("getCsAnswerListService에서 생긴 오류", err);
    throw err;
  }
};

module.exports = {
  insertCsService,
  insertCsAnswerService,
  getCsDetailService,
  getCsListService,
  deleteCsService,
  adminDeleteCsService,
  adminDeleteCsAnswerService,
  getCsAnswerListService,
};

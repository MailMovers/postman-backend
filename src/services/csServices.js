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
const insertCsAnswerService = async (content, userId) => {
  return await insertCsAnswerDao(content, userId);
};
//게시물 상세정보 불러오기
const getCsDetailSetvice = async (customerServiceId, userId) => {
  return await getCsDetailDao(customerServiceId, userId);
};
//게시물 목록 불러오기
const getCsListService = async (startItem, pageSize) => {
  try {
    const csList = await CsListDao(startItem, pageSize);
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
const adminDeleteCsAnswerService = async (userId, csAnswerId) => {
  try {
    const result = await adminDeleteCsAnswerDao(userId, csAnswerId);
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
  getCsDetailSetvice,
  getCsListService,
  deleteCsService,
  adminDeleteCsService,
  adminDeleteCsAnswerService,
  getCsAnswerListService,
};

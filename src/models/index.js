const {
  insertDeliveryAddressDao,
  insertSendAddressDao,
  deleteSendAddressDao,
  deleteDeliveryAddressDao,
  getSendListAddressDao,
  getDeliveryListAddressDao,
  getSendAddressDao,
  getDeliveryAddressDao,
} = require("./addressDao");

const {
  letterDao,
  photoDao,
  countPhotoDao,
  stampDao,
  confirmLetterDao,
} = require("./writingLetterDao");

// user dao
const UserDao = require("./userDao");

const {
  insertProductDao,
  getUserByIdDao,
  deleteProductDao,
  getProductDao,
  getProductListDao,
  getUserByReviewDao,
  insertReviewDao,
  getReviewDao,
  deleteReviewDao,
} = require("./productDao");

const {
  paymentInsertInfoDao,
  getPricesDao,
  addPointDao,
} = require("./paymentDao");

const {
  insertCsDao,
  insertCsAnswerDao,
  getCsDetailDao,
  CsListDao,
  deleteCsDao,
  adminDeleteCsDao,
  adminDeleteCsAnswerDao,
} = require("./csDao");

module.exports = {
  insertDeliveryAddressDao,
  insertSendAddressDao,
  deleteSendAddressDao,
  deleteDeliveryAddressDao,
  getSendListAddressDao,
  getDeliveryListAddressDao,
  getSendAddressDao,
  getDeliveryAddressDao,
  letterDao,
  photoDao,
  countPhotoDao,
  stampDao,
  confirmLetterDao,
  UserDao,
  paymentInsertInfoDao,
  getPricesDao,
  addPointDao,
  insertProductDao,
  getUserByIdDao,
  deleteProductDao,
  getProductDao,
  getProductListDao,
  getUserByReviewDao,
  insertReviewDao,
  getReviewDao,
  deleteReviewDao,
  cs: {
    insertCsDao,
    insertCsAnswerDao,
    getCsDetailDao,
    CsListDao,
    deleteCsDao,
    adminDeleteCsDao,
    adminDeleteCsAnswerDao,
  },
};

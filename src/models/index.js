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
  contentDao,
  checkLetterDao,
  letterAddressDao,
  checkExistingDeliveryAddressDao,
  checkExistingSendAddressDao,
  updateLetterDao,
  deleteContentsDao,
  updateCountPhotoDao,
  delPhotoDao,
  getContentDao,
  getPhotosDao,
  historyLetterDao,
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
  getCountProductListDao,
  getCategoryListWithCountDao,
} = require("./productDao");

const {
  paymentInsertInfoDao,
  getPricesDao,
  addPointDao,
  getRecipe,
  recordPointTransactionDao,
  confirmPoint,
} = require("./paymentDao");

const {
  insertCsDao,
  insertCsAnswerDao,
  getCsDetailDao,
  CsListDao,
  deleteCsDao,
  adminDeleteCsDao,
  adminDeleteCsAnswerDao,
  getCsAlistDao,
} = require("./csDao");

const {
  upDateProductDao,
  getLetterAddressDao,
  insertNoticeDao,
  updateNoticeDao,
  getNoticeDetailDao,
  getNoticeListDao,
  deleteNoticeDao,
} = require("./adminDao");

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
  getCountProductListDao,
  getCategoryListWithCountDao,
  cs: {
    insertCsDao,
    insertCsAnswerDao,
    getCsDetailDao,
    CsListDao,
    deleteCsDao,
    adminDeleteCsDao,
    adminDeleteCsAnswerDao,
    getCsAlistDao,
  },
  admin: {
    upDateProductDao,
    getLetterAddressDao,
    insertNoticeDao,
    updateNoticeDao,
    getNoticeDetailDao,
    getNoticeListDao,
    deleteNoticeDao,
  },
  contentDao,
  checkLetterDao,
  letterAddressDao,
  checkExistingDeliveryAddressDao,
  checkExistingSendAddressDao,
  updateLetterDao,
  deleteContentsDao,
  updateCountPhotoDao,
  delPhotoDao,
  getContentDao,
  getPhotosDao,
  historyLetterDao,
  getRecipe,
  recordPointTransactionDao,
  confirmPoint,
};

const {
  insertAddressService,
  insertSendAddressService,
  deleteSendAddressService,
  deleteDeliveryAddressService,
  getSendListAddressService,
  getDeliveryListAddressService,
  getSendAddressService,
  getDeliveryAddressService,
} = require("./addressServices");

const { PreSignedUrl, insertS3Url } = require("./s3");

const {
  letterService,
  countPhotoService,
  stampService,
  confirmLetterService,
  checkLetterService,
  checkAndInsertAddressService,
  updateLetterService,
  PhotoService,
  delPhotoService,
  historyLetterService,
  getPhotoInfoService,
} = require("./writingLetterServices");

const {
  paymentSuccessService,
  getPaymentInfoService,
  getPointTransactionsService,
  usePointsForPaymentService,
} = require("./paymentServices");

// user service class
const UserService = require("./userServices");

const {
  insertProductService,
  deleteProductService,
  getProductService,
  getProductListService,
  insertReviewService,
  getReviewService,
  deleteReviewService,
  getWritingPadService,
  getProductCategoriService,
  getReviewListService,
} = require("./productServices");

const {
  insertCsService,
  insertCsAnswerService,
  getCsDetailService,
  getCsListService,
  deleteCsService,
  adminDeleteCsService,
  adminDeleteCsAnswerService,
  getCsAnswerListService,
} = require("./csServices");

const {
  updateProductService,
  getAllAddressService,
  insertNoticeService,
  updateNoticeService,
  getNoticeDetailService,
  getNoticeListService,
  deleteNoticeService,
  adminDeleteReviewService,
  getProductReviewService,
} = require("./adminService");

module.exports = {
  insertAddressService,
  insertSendAddressService,
  deleteSendAddressService,
  deleteDeliveryAddressService,
  getSendListAddressService,
  getDeliveryListAddressService,
  getSendAddressService,
  getDeliveryAddressService,
  letterService,
  stampService,
  confirmLetterService,
  UserService,
  insertProductService,
  deleteProductService,
  getProductService,
  getProductListService,
  insertReviewService,
  getReviewService,
  deleteReviewService,
  paymentSuccessService,
  getWritingPadService,
  getProductCategoriService,
  getReviewListService,
  cs: {
    insertCsService,
    insertCsAnswerService,
    getCsDetailService,
    getCsListService,
    deleteCsService,
    adminDeleteCsService,
    adminDeleteCsAnswerService,
    getCsAnswerListService,
  },
  admin: {
    updateProductService,
    getAllAddressService,
    insertNoticeService,
    updateNoticeService,
    getNoticeDetailService,
    getNoticeListService,
    deleteNoticeService,
    adminDeleteReviewService,
    getProductReviewService,
  },
  checkLetterService,
  checkAndInsertAddressService,
  updateLetterService,
  countPhotoService,
  PhotoService,
  delPhotoService,
  historyLetterService,
  getPaymentInfoService,
  getPointTransactionsService,
  getPhotoInfoService,
  usePointsForPaymentService,
  s3: { PreSignedUrl, insertS3Url },
};

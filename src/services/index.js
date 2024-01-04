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
} = require("./writingLetterServices");

const { paymentSuccessService } = require("./paymentServices");

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
};

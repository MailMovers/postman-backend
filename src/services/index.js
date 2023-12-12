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
  PhotoService,
  stampService,
  confirmLetterService,
  checkLetterService,
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
  PhotoService,
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
  checkLetterService,
};

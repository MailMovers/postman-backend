const {
  insertDeliveryAddressController,
  insertSendAddressController,
  deleteSendAddressController,
  deleteDeliveryAddressController,
  getSendAddressListController,
  getDeliveryAddressListController,
  getSendAddressController,
  getDeliveryAddressController,
} = require("./addressControllers");

const {
  letterController,
  photoController,
  confirmLetterController,
  stampController,
  checkLetterController,
  getUploadUrl,
  delPhotoController,
  historyLetterController,
  getPhotoInfoController,
} = require("./writingLetterControllers");

// user controller class
const UserController = require("./userControllers");

const {
  insertProductController,
  deleteProductController,
  getProductController,
  getProductListController,
  insertReviewController,
  getReviewController,
  deleteReviewController,
  getWritingPadController,
  getProductCategoriController,
  getReviewListController,
  newProductController,
  popularProductContoller,
  deleteMyreviewController,
} = require("./productControllers");

const {
  paymentSuccessController,
  getPaymentInfoController,
  getPointTransactions,
  usePointsForPaymentController,
} = require("./paymentControllers.js");

const {
  insertCsController,
  insertCsAnswerController,
  getCsDetailController,
  getCslistController,
  deleteCsController,
  adminCsDeleteController,
  adminDeleteCsAnswerController,
  getCsAnswerListController,
} = require("./csControllers");

const {
  updataProductController,
  getAllAddressController,
  insertNoticeController,
  updateNoticeController,
  getNoticeDetailController,
  getNoticeListController,
  deleteNoticeController,
  getLetterController,
  getPhotoController,
  getAddressController,
  adminDeleteReviewController,
  getProductReviewlistController,
} = require("./adminController");

module.exports = {
  UserController,
  addressController: {
    insertDeliveryAddressController,
    insertSendAddressController,
    deleteSendAddressController,
    deleteDeliveryAddressController,
    getSendAddressListController,
    getDeliveryAddressListController,
    getSendAddressController,
    getDeliveryAddressController,
  },
  writingLetterController: {
    letterController,
    photoController,
    stampController,
    confirmLetterController,
    checkLetterController,
    getUploadUrl,
    delPhotoController,
    historyLetterController,
    getPhotoInfoController,
  },

  productController: {
    insertProductController,
    deleteProductController,
    getProductController,
    getProductListController,
    insertReviewController,
    getReviewController,
    deleteReviewController,
    getWritingPadController,
    getProductCategoriController,
    getReviewListController,
    newProductController,
    popularProductContoller,
    deleteMyreviewController,
  },
  paymentController: {
    paymentSuccessController,
    getPaymentInfoController,
    getPointTransactions,
    usePointsForPaymentController,
  },
  csController: {
    insertCsController,
    insertCsAnswerController,
    getCsDetailController,
    getCslistController,
    deleteCsController,
    adminCsDeleteController,
    adminDeleteCsAnswerController,
    getCsAnswerListController,
  },
  admin: {
    updataProductController,
    getAllAddressController,
    insertNoticeController,
    updateNoticeController,
    getNoticeDetailController,
    getNoticeListController,
    deleteNoticeController,
    getLetterController,
    getPhotoController,
    getAddressController,
    adminDeleteReviewController,
    getProductReviewlistController,
  },
};

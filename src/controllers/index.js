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
} = require("./productControllers");

const { paymentSuccessController } = require("./paymentControllers.js");

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
  },
  paymentController: {
    paymentSuccessController,
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
  },
};

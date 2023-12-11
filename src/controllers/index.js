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
  letterContoller,
  photoContoller,
  confirmLetterContoller,
  stampController,
  saveOrUpdateAddressController,
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
} = require("./csControllers");

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
    letterContoller,
    photoContoller,
    stampController,
    saveOrUpdateAddressController,
    confirmLetterContoller,
  },

  productController: {
    insertProductController,
    deleteProductController,
    getProductController,
    getProductListController,
    insertReviewController,
    getReviewController,
    deleteReviewController,
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
  },
};

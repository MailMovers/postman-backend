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
  photoController,
  confirmLetterContoller,
  stampController,
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
    letterContoller,
    photoController,
    stampController,
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
    getWritingPadController,
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
  admin: { updataProductController, getAllAddressController },
};

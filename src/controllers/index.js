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

const {
  paymentSuccessController,
} = require("./paymentControllers.js")

module.exports = {
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
  paymentController: {
    paymentSuccessController,
  }
};

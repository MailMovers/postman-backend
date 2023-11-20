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
  insertProductController,
  deleteProductController,
  getProductController,
  getProductListController,
} = require("./productControllers");

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

  productController: {
    insertProductController,
    deleteProductController,
    getProductController,
    getProductListController,
  },
};

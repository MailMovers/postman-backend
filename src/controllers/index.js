const {
  insertAddressController,
  insertSendAddressController,
  deleteSendAddressController,
  deleteDeliveryAddressController,
  getSendAddressListController,
  getDeliveryAddressListController,
  getSendAddressController,
  getDeliveryAddressController,
} = require("./addressControllers");

module.exports = {
  addressController: {
    insertAddressController,
    insertSendAddressController,
    deleteSendAddressController,
    deleteDeliveryAddressController,
    getSendAddressListController,
    getDeliveryAddressListController,
    getSendAddressController,
    getDeliveryAddressController,
  },
};

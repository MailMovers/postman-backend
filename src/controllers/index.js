const {
  insertAddressController,
  insertSendAddressController,
  deleteSendAddressController,
  deleteDeliveryAddressController,
} = require("./addressControllers");

module.exports = {
  addressController: {
    insertAddressController,
    insertSendAddressController,
    deleteSendAddressController,
    deleteDeliveryAddressController,
  },
};

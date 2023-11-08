const express = require("express");
const { addressController } = require("../controllers");
const {
  insertAddressController,
  insertSendAddressController,
  deleteSendAddressController,
  deleteDeliveryAddressController,
} = addressController;
const addressRoute = express.Router();

addressRoute.post("/", insertAddressController);
addressRoute.post("/send", insertSendAddressController);
addressRoute.post("/delete", deleteDeliveryAddressController);
addressRoute.post("/sand/delete", deleteSendAddressController);

module.exports = { addressRoute };

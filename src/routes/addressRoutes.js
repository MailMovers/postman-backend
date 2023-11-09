const express = require("express");
const { addressController } = require("../controllers");
const {
  insertAddressController,
  insertSendAddressController,
  deleteSendAddressController,
  deleteDeliveryAddressController,
  getSendAddressListController,
  getDeliveryAddressListController,
  getSendAddressController,
} = addressController;
const addressRoute = express.Router();

addressRoute.post("/", insertAddressController);
addressRoute.post("/send", insertSendAddressController);
addressRoute.post("/delete", deleteDeliveryAddressController);
addressRoute.post("/sand/delete", deleteSendAddressController);
addressRoute.get("/send", getSendAddressListController);
addressRoute.get("/", getDeliveryAddressListController);
addressRoute.get("/default/send", getSendAddressController);

module.exports = { addressRoute };

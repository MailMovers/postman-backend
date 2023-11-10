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
  getDeliveryAddressController,
} = addressController;
const addressRoute = express.Router();

addressRoute.post("/", insertAddressController);
addressRoute.post("/send", insertSendAddressController);
addressRoute.post("/delete", deleteDeliveryAddressController);
addressRoute.post("/sand/delete", deleteSendAddressController);
addressRoute.get("/send", getSendAddressListController);
addressRoute.get("/", getDeliveryAddressListController);
addressRoute.get("/default/send", getSendAddressController);
addressRoute.get("/default/", getDeliveryAddressController);

module.exports = { addressRoute };

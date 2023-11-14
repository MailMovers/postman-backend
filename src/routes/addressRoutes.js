const express = require("express");
const { addressController } = require("../controllers");
const {
  insertDeliveryAddressController,
  insertSendAddressController,
  deleteSendAddressController,
  deleteDeliveryAddressController,
  getSendAddressListController,
  getDeliveryAddressListController,
  getSendAddressController,
  getDeliveryAddressController,
} = addressController;
const addressRoute = express.Router();

addressRoute.post("/delivery", insertDeliveryAddressController);
addressRoute.post("/send", insertSendAddressController);
addressRoute.post("/delivery/delete", deleteDeliveryAddressController);
addressRoute.post("/sand/delete", deleteSendAddressController);
addressRoute.get("/send", getSendAddressListController);
addressRoute.get("/delivery", getDeliveryAddressListController);
addressRoute.get("/default/send", getSendAddressController);
addressRoute.get("/default/delivery", getDeliveryAddressController);

module.exports = { addressRoute };

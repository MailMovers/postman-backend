const express = require("express");
const { addressController } = require("../controllers");
const auth = require("../middlewares/auth.middleware");

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

addressRoute.post("/delivery", auth, insertDeliveryAddressController);
addressRoute.post("/send", auth, insertSendAddressController);
addressRoute.post("/delete", auth, deleteDeliveryAddressController);
addressRoute.post("/delete/send", auth, deleteSendAddressController);
addressRoute.get("/send", auth, getSendAddressListController);
addressRoute.get("/delivery", auth, getDeliveryAddressListController);
addressRoute.get("/default/send", auth, getSendAddressController);
addressRoute.get("/default/delivery", auth, getDeliveryAddressController);

module.exports = { addressRoute };

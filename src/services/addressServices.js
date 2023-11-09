const {
  insertAddressDao,
  insertSendAddressDao,
  deleteSendAddressDao,
  deleteDeliveryAddressDao,
  getSendListAddressDao,
  getDeliveryListAddressDao,
  getSendAddressDao,
} = require("../models/addressDao");

const insertAddressService = async (
  userId,
  deliveryAddress,
  deliveryAddressDetail,
  deliveryPhone,
  deliveryName
) => {
  return await insertAddressDao(
    userId,
    deliveryAddress,
    deliveryAddressDetail,
    deliveryPhone,
    deliveryName
  );
};

const insertSendAddressService = async (
  userId,
  sendAddress,
  sendAddressDetail,
  sendPhone,
  sendName
) => {
  return await insertSendAddressDao(
    userId,
    sendAddress,
    sendAddressDetail,
    sendPhone,
    sendName
  );
};

const deleteSendAddressService = async (userId, sendAddressId) => {
  return await deleteSendAddressDao(userId, sendAddressId);
};

const deleteDeliveryAddressService = async (userId, deliveryAddressId) => {
  return await deleteDeliveryAddressDao(userId, deliveryAddressId);
};

const getSendListAddressService = async (userId) => {
  return await getSendListAddressDao(userId);
};

const getDeliveryListAddressService = async (userId) => {
  return await getDeliveryListAddressDao(userId);
};

const getSendAddressService = async (userId, sendAddressId) => {
  return await getSendAddressDao(userId, sendAddressId);
};
module.exports = {
  insertAddressService,
  insertSendAddressService,
  deleteSendAddressService,
  deleteDeliveryAddressService,
  getSendListAddressService,
  getDeliveryListAddressService,
  getSendAddressService,
};

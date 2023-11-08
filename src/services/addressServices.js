const {
  insertAddressDao,
  insertSendAddressDao,
  deleteSendAddressDao,
  deleteDeliveryAddressDao,
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

const deleteSendAddressService = async (userId, addressId) => {
  return await deleteSendAddressDao(userId, addressId);
};

const deleteDeliveryAddressService = async (userId, addressId) => {
  return await deleteDeliveryAddressDao(userId, addressId);
};

module.exports = {
  insertAddressService,
  insertSendAddressService,
  deleteSendAddressService,
  deleteDeliveryAddressService,
};

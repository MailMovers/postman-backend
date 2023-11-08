const {
  insertAddressDao,
  insertSendAddressDao,
  deleteSendAddressDao,
  deleteDeliveryAddressDao,
<<<<<<< HEAD
  getSendListAddressDao,
  getDeliveryListAddressDao,
  getSendAddressDao,
=======
>>>>>>> d79eb7b (스테이징)
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

<<<<<<< HEAD
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
=======
const deleteSendAddressService = async (userId, addressId) => {
  return await deleteSendAddressDao(userId, addressId);
};

const deleteDeliveryAddressService = async (userId, addressId) => {
  return await deleteDeliveryAddressDao(userId, addressId);
};

>>>>>>> d79eb7b (스테이징)
module.exports = {
  insertAddressService,
  insertSendAddressService,
  deleteSendAddressService,
  deleteDeliveryAddressService,
<<<<<<< HEAD
  getSendListAddressService,
  getDeliveryListAddressService,
  getSendAddressService,
=======
>>>>>>> d79eb7b (스테이징)
};

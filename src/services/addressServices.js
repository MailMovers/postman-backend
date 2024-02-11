const {
  insertDeliveryAddressDao,
  insertSendAddressDao,
  deleteSendAddressDao,
  deleteDeliveryAddressDao,
  getSendListAddressDao,
  getDeliveryListAddressDao,
  getSendAddressDao,
  getDeliveryAddressDao,
} = require("../models/addressDao");

const insertAddressService = async (
  userId,
  deliveryAddress,
  deliveryAddressDetail,
  deliveryPhone,
  deliveryName,
  postCode
) => {
  return await insertDeliveryAddressDao(
    userId,
    deliveryAddress,
    deliveryAddressDetail,
    deliveryPhone,
    deliveryName,
    postCode
  );
};

const insertSendAddressService = async (
  userId,
  sendAddress,
  sendAddressDetail,
  sendPhone,
  sendName,
  postCode
) => {
  return await insertSendAddressDao(
    userId,
    sendAddress,
    sendAddressDetail,
    sendPhone,
    sendName,
    postCode
  );
};

const deleteSendAddressService = async (userId, sendAddressId) => {
  return await deleteSendAddressDao(userId, sendAddressId);
};

const deleteDeliveryAddressService = async (userId, deliveryAddressId) => {
  const deleteDeliveryAddress = await deleteDeliveryAddressDao(
    userId,
    deliveryAddressId
  );
  return deleteDeliveryAddress;
};

const getSendListAddressService = async (userId) => {
  const addressList = await getSendListAddressDao(userId);
  const filteredAddressList = addressList.filter(
    (address) => address.deleted_at === null
  );
  return filteredAddressList;
};

const getDeliveryListAddressService = async (userId) => {
  const addressList = await getDeliveryListAddressDao(userId);
  const filteredAddressList = addressList.filter(
    (address) => address.deleted_at === null
  );
  return filteredAddressList;
};

const getSendAddressService = async (userId) => {
  return await getSendAddressDao(userId);
};
const getDeliveryAddressService = async (userId) => {
  return getDeliveryAddressDao(userId);
};

module.exports = {
  insertAddressService,
  insertSendAddressService,
  deleteSendAddressService,
  deleteDeliveryAddressService,
  getSendListAddressService,
  getDeliveryListAddressService,
  getSendAddressService,
  getDeliveryAddressService,
};

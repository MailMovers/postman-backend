const {
  insertAddressDao,
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
  const addressList = await getSendAddressDao(userId);
  const filteredAddressList = addressList.filter(
    (address) => address.deleted_at === null
  );
  return filteredAddressList;
};
const getDeliveryAddressService = async (userId) => {
  const addressList = await getDeliveryAddressDao(userId);
  const filteredAddressList = addressList.filter(
    (address) => address.deleted_at === null
  );
  return filteredAddressList;
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

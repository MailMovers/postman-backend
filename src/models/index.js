const {
  insertDeliveryAddressDao,
  insertSendAddressDao,
  deleteSendAddressDao,
  deleteDeliveryAddressDao,
  getSendListAddressDao,
  getDeliveryListAddressDao,
  getSendAddressDao,
  getDeliveryAddressDao,
} = require("./addressDao");

const {
  letterDao,
  photoDao,
  countPhotoDao,
  stampDao,
  confirmLetterDao,
} = require("./writingLetterDao");

const { insertProductDao, getUserByIdDao } = require("./productDao");

module.exports = {
  insertDeliveryAddressDao,
  insertSendAddressDao,
  deleteSendAddressDao,
  deleteDeliveryAddressDao,
  getSendListAddressDao,
  getDeliveryListAddressDao,
  getSendAddressDao,
  getDeliveryAddressDao,
  letterDao,
  photoDao,
  countPhotoDao,
  stampDao,
  confirmLetterDao,
  productDao: {
    insertProductDao,
    getUserByIdDao,
  },
};

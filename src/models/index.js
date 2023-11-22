const {
    insertDeliveryAddressDao,
    insertSendAddressDao,
    deleteSendAddressDao,
    deleteDeliveryAddressDao,
    getSendListAddressDao,
    getDeliveryListAddressDao,
    getSendAddressDao,
    getDeliveryAddressDao,
} = require('./addressDao');

const {
    letterDao,
    photoDao,
    countPhotoDao,
    stampDao,
    confirmLetterDao,
} = require('./writingLetterDao');

// user dao
const UserDao = require('./userDao');

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
    UserDao,
};

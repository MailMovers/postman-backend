const {
    insertAddressService,
    insertSendAddressService,
    deleteSendAddressService,
    deleteDeliveryAddressService,
    getSendListAddressService,
    getDeliveryListAddressService,
    getSendAddressService,
    getDeliveryAddressService,
} = require('./addressServices');

const {
    letterService,
    PhotoService,
    stampService,
    confirmLetterService,
    saveOrUpdateAddressService,
} = require('./writingLetterServices');

// user service class
const UserService = require('./userServices');

module.exports = {
    insertAddressService,
    insertSendAddressService,
    deleteSendAddressService,
    deleteDeliveryAddressService,
    getSendListAddressService,
    getDeliveryListAddressService,
    getSendAddressService,
    getDeliveryAddressService,
    letterService,
    PhotoService,
    stampService,
    saveOrUpdateAddressService,
    confirmLetterService,
    UserService,
};

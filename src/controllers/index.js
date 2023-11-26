const {
    insertDeliveryAddressController,
    insertSendAddressController,
    deleteSendAddressController,
    deleteDeliveryAddressController,
    getSendAddressListController,
    getDeliveryAddressListController,
    getSendAddressController,
    getDeliveryAddressController,
} = require('./addressControllers');

const {
    letterContoller,
    photoContoller,
    confirmLetterContoller,
    stampController,
    saveOrUpdateAddressController,
} = require('./writingLetterControllers');

// user controller class
const UserController = require('./userControllers');

const { paymentSuccessController } = require('./paymentControllers.js');

module.exports = {
    UserController,
    addressController: {
        insertDeliveryAddressController,
        insertSendAddressController,
        deleteSendAddressController,
        deleteDeliveryAddressController,
        getSendAddressListController,
        getDeliveryAddressListController,
        getSendAddressController,
        getDeliveryAddressController,
    },
    writingLetterController: {
        letterContoller,
        photoContoller,
        stampController,
        saveOrUpdateAddressController,
        confirmLetterContoller,
    },
    paymentController: {
        paymentSuccessController,
    },
};

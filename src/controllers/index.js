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

const { signUpController } = require('./userControllers');

module.exports = {
    userController: {
        signUpController,
    },
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
};

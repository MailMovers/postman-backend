const {
    confirmLetterDao,
    letterDao,
    photoDao,
    countPhotoDao,
    stampDao
} = require("../models/writingLetterDao")
const {
    getSendListAddressDao,
    getDeliveryListAddressDao,
    insertSendAddressDao,
    insertDeliveryAddressDao
} = require("../models/addressDao")
// 편지저장
const letterService = async (userId, fontId, wriringPadId, content, page) => {
    try {
        await letterDao(userId, fontId, wriringPadId, content, page)
        return {
            success: true,
            message: '편지가 성공적으로 저장되었습니다.',
            data: await letterDao(userId, fontId, wriringPadId, content, page)
        }
    } catch (error) {
        console.error('Error in letterService:', error);
        return { success: false, message: 'Error in letterService. Please try again later.' };
    }
}
// 쓰던 편지 불러오기

// 사진저장
const PhotoService = async (imgUrl, letterId, photoCount) => {
    try {
        await photoDao(imgUrl, letterId)
        await countPhotoDao(photoCount, letterId)
        return {
            success: true,
            message: '사진이 성공적으로 저장되었습니다.',
            data: await photoDao(imgUrl, letterId),
            data: await countPhotoDao(photoCount, letterId)
        }
    } catch (error) {
        console.error('Error in PhotoService:', error);
        return { success: false, message: 'Error in PhotoService. Please try again later.' };
    }
}

// 우표선택
const stampService = async (stampId, letterId) => {
    try {
        await stampDao(stampId, letterId)
        return {
            success: true,
            message: '우표가 성공적으로 선택되었습니다.',
            data: await stampDao(stampId, letterId)
        }
    } catch (error) {
        console.error('Error in stampService:', error);
        return { success: false, message: 'Error in stampService. Please try again later.' };
    }
}



// 주소선택
// 주소 선택 및 저장
const saveOrUpdateAddressService = async (userId, addressData) => {

    const existingSendAddresses = await getSendListAddressDao(userId);
    const existingDeliveryAddresses = await getDeliveryListAddressDao(userId);

    const isAddressDuplicate = (existingAddresses, newAddress, addressType) => {
        return existingAddresses.some(existingAddress =>
            existingAddress[addressType] === newAddress[addressType] &&
            existingAddress[`${addressType}_detail`] === newAddress[`${addressType}_detail`] &&
            existingAddress[`${addressType}_phone`] === newAddress[`${addressType}_phone`] &&
            existingAddress[`${addressType}_name`] === newAddress[`${addressType}_name`]
        );
    };

    if (isAddressDuplicate(existingSendAddresses, addressData, 'send')) {
        const duplicateSendAddress = existingSendAddresses.find(existingAddress =>
            existingAddress.send_address === addressData.send_address &&
            existingAddress.send_address_detail === addressData.send_address_detail &&
            existingAddress.send_phone === addressData.send_phone &&
            existingAddress.send_name === addressData.send_name
        );
        const letterId = duplicateSendAddress.id;
    } else {
        insertSendAddressDao(addressData);
    }

    if (isAddressDuplicate(existingDeliveryAddresses, addressData, 'delivery')) {
        const duplicateDeliveryAddress = existingDeliveryAddresses.find(existingAddress =>
            existingAddress.delivery_address === addressData.delivery_address &&
            existingAddress.delivery_address_detail === addressData.delivery_address_detail &&
            existingAddress.delivery_phone === addressData.delivery_phone &&
            existingAddress.delivery_name === addressData.delivery_name
        );
        const letterId = duplicateDeliveryAddress.id;
        // 여기에 'await updatedeliveryaddressdao' 함수 호출이 와야 합니다.
    } else {
        insertDeliveryAddressDao(addressData);
    }
};




// 최종내용확인
const confirmLetterService = async (userId) => {
    try {
        return {
            success: true,
            message: '내역이 성공적으로 전달되었습니다.',
            data: await confirmLetterDao(userId)
        }
    } catch (error) {
        console.error('Error in confirmLetterService:', error);
        return { success: false, message: 'Error in confirmLetterService. Please try again later.' };
    }
}

module.exports = {
    letterService,
    PhotoService,
    confirmLetterService,
    stampService,
    saveOrUpdateAddressService
}

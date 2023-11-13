const { confirmLetterDao, letterDao, photoDao, countPhotoDao, stampDao } = require("../models/writingLetterDao")

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
            message: '사진이 성공적으로 저장되었습니다.',
            data: await stampDao(stampId, letterId)
        }
    } catch (error) {
        console.error('Error in PhotoService:', error);
        return { success: false, message: 'Error in checkPhotoService. Please try again later.' };
    }
}

// 기입한 주소 및 선택한 우표 확인

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

module.exports = { letterService, PhotoService, confirmLetterService, stampService }

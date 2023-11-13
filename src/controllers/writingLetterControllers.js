const { letterService, PhotoService, confirmLetterService, stampService } = require("../services/writingLetterServices")

const letterContoller = async (req, res, next) => {
    try {
        const { userId, fontId, wriringPadId, content, page } = req.body
        await letterService(userId, fontId, wriringPadId, content, page)
        return {
            success: true,
            message: 'letterContoller pass.',
            data: await letterService(userId, fontId, wriringPadId, content, page)
        }
    } catch (error) {
        console.error('Error in letterController :', error)
        return { success: false, message: 'Error in letterContoller. Please try again later.' };
    }
}

const photoContoller = async (req, res, next) => {
    try {
        const { imgUrl, letterId, photoCount, userId } = req.body
        await PhotoService(imgUrl, letterId, photoCount, userId)
        return {
            success: true,
            message: 'photoContoller pass.',
            data: await PhotoService(imgUrl, letterId, photoCount, userId)
        }
    } catch (error) {
        console.error('Error in photoContoller :', error)
        return { success: false, message: 'Error in photoContoller. Please try again later.' };
    }
}

const stampController = async (req, res, next) => {
    try {
        const { stampId, letterId } = req.body
        await stampService(stampId, letterId)
        return {
            success: true,
            message: 'stampContoller pass.',
            data: await stampService(stampId, letterId)
        }
    } catch (error) {
        console.error('Error in stampContoller :', error)
        return { success: false, message: 'Error in stampContoller. Please try again later.' };
    }
}

const confirmLetterContoller = async (req, res, next) => {
    try {
        const userId = req.param.userId
        return {
            success: true, data: confirmLetterService(userId),
            message: 'confirmLetterContoller pass.',
            data: await confirmLetterService(userId)
        }
    } catch (error) {
        console.error('Error in confirmLetterContoller :', error)
        return { success: false, message: 'Error in confirmLetterContoller. Please try again later.' };
    }
}

module.exports = { letterContoller, photoContoller, confirmLetterContoller, stampController }
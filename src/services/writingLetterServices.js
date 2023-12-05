const {
  confirmLetterDao,
  letterDao,
  photoDao,
  countPhotoDao,
  stampDao,
  contentDao,
} = require("../models/writingLetterDao");

const letterService = async (userId, writingPadId, contents) => {
  try {
    const page = contents.length;
    const letterResult = await letterDao(userId, writingPadId, page);
    const letterId = letterResult.insertId;
    for (let item of contents) {
      await contentDao(letterId, item.count, item.content);
    }

    return {
      success: true,
      message: "편지가 성공적으로 저장되었습니다.",
      data: letterResult,
    };
  } catch (error) {
    console.error("Error in letterService:", error);
    return {
      success: false,
      message: "Error in letterService. Please try again later.",
    };
  }
};

const PhotoService = async (s3Url, letterId, photoCount) => {
  try {
    const photoResult = await photoDao(s3Url, letterId);
    const countResult = await countPhotoDao(photoCount, letterId);
    return {
      success: true,
      message: "사진이 성공적으로 저장되었습니다.",
      photoData: photoResult,
      countData: countResult,
    };
  } catch (error) {
    console.error("Error in PhotoService:", error);
    return {
      success: false,
      message: "Error in PhotoService. Please try again later.",
    };
  }
};

const stampService = async (stampId, letterId) => {
  try {
    const result = await stampDao(stampId, letterId);
    return {
      success: true,
      message: "우표가 성공적으로 선택되었습니다.",
      data: result,
    };
  } catch (error) {
    console.error("Error in stampService:", error);
    return {
      success: false,
      message: "Error in stampService. Please try again later.",
    };
  }
};

const confirmLetterService = async (userId) => {
  try {
    return {
      success: true,
      message: "내역이 성공적으로 전달되었습니다.",
      data: await confirmLetterDao(userId),
    };
  } catch (error) {
    console.error("Error in confirmLetterService:", error);
    return {
      success: false,
      message: "Error in confirmLetterService. Please try again later.",
    };
  }
};

module.exports = {
  letterService,
  PhotoService,
  confirmLetterService,
  stampService,
};

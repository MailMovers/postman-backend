const {
  confirmLetterDao,
  letterDao,
  photoDao,
  countPhotoDao,
  stampDao,
  contentDao,
  checkLetterDao,
  letterAddressDao,
  checkExistingDeliveryAddressDao,
  checkExistingSendAddressDao,
} = require("../models/writingLetterDao");

const {
  insertDeliveryAddressDao,
  insertSendAddressDao,
} = require("../models/addressDao");

const letterService = async (userId, writingPadId, contents) => {
  try {
    const page = contents.length;
    const letterResult = await letterDao(userId, writingPadId, page);
    const letterId = letterResult.id;
    for (let item of contents) {
      await contentDao(letterId, item.pageNum, item.content); // content id letters테이블에 넣기
    }

    return {
      success: true,
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

const checkAndInsertAddressService = async (
  userId,
  sendAddress,
  sendAddressDetail,
  sendPhone,
  sendName,
  deliveryAddress,
  deliveryAddressDetail,
  deliveryPhone,
  deliveryName
) => {
  try {
    const existingDeliveryAddress = await checkExistingDeliveryAddressDao(
      userId,
      deliveryAddress,
      deliveryAddressDetail,
      deliveryPhone,
      deliveryName
    );
    const existingSendAddress = await checkExistingSendAddressDao(
      userId,
      sendAddress,
      sendAddressDetail,
      sendPhone,
      sendName
    );

    let deliveryAddressId, sendAddressId;

    if (existingDeliveryAddress) {
      deliveryAddressId = existingDeliveryAddress.id;
    } else {
      const newDeliveryAddress = await insertDeliveryAddressDao(
        userId,
        deliveryAddress,
        deliveryAddressDetail,
        deliveryPhone,
        deliveryName
      );
      deliveryAddressId = newDeliveryAddress.insertId;
    }

    if (existingSendAddress) {
      sendAddressId = existingSendAddress.id;
    } else {
      const newSendAddress = await insertSendAddressDao(
        userId,
        sendAddress,
        sendAddressDetail,
        sendPhone,
        sendName
      );
      sendAddressId = newSendAddress.insertId;
    }

    await letterAddressDao(deliveryAddressId, sendAddressId, userId);

    return { deliveryAddressId, sendAddressId };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const checkLetterService = async (userId) => {
  try {
    const result = await checkLetterDao(userId);

    const letters = result.reduce((acc, row) => {
      const existingLetter = acc.find(
        (letter) => letter.letter_id === row.letter_id
      );
      if (existingLetter) {
        existingLetter.contents.push({
          pageNum: row.content_count,
          content: row.content,
        });
      } else {
        acc.push({
          letterId: row.letter_id,
          writingPadId: row.writing_pad_id,
          contents: [
            {
              pageNum: row.content_count,
              content: row.content,
            },
          ],
        });
      }
      return acc;
    }, []);

    return letters;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const PhotoService = async (s3Url, letterId, photoCount) => {
  try {
    const photoResult = await photoDao(s3Url, letterId);
    const countResult = await countPhotoDao(photoCount, letterId);
    return {
      success: true,
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
  checkLetterService,
  checkAndInsertAddressService,
};

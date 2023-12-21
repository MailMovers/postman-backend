const {
  confirmLetterDao,
  letterDao,
  stampDao,
  contentDao,
  checkLetterDao,
  letterAddressDao,
  checkExistingDeliveryAddressDao,
  checkExistingSendAddressDao,
  updateLetterDao,
  deleteContentsDao,
  countPhotoDao,
  updateCountPhotoDao,
  photoDao,
} = require("../models/writingLetterDao");

const { getProductDao } = require("../models/productDao");

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
    return letterId;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateLetterService = async (contents, letterId) => {
  try {
    // 기존 contents를 삭제합니다.
    await deleteContentsDao(letterId);

    const page = contents.length;
    const letterResult = await updateLetterDao(page, letterId);
    for (let item of contents) {
      await contentDao(letterId, item.pageNum, item.content);
    }
    return { letterId, letterResult };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const checkAndInsertAddressService = async (
  userId,
  letterId,
  deliveryAddress,
  deliveryAddressDetail,
  deliveryPhone,
  deliveryName,
  sendAddress,
  sendAddressDetail,
  sendPhone,
  sendName
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
      deliveryAddressId = existingDeliveryAddress;
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
      sendAddressId = existingSendAddress;
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

    await letterAddressDao(deliveryAddressId, sendAddressId, letterId);
    return { deliveryAddressId, sendAddressId };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const checkLetterService = async (userId) => {
  try {
    const result = await checkLetterDao(userId);
    const letters = await Promise.all(
      result.map(async (row) => {
        const product = await getProductDao(row.writing_pad_id);
        console.log(product);
        const productPic = product[0] ? product[0].img_url : null; // product가 null이 아닌 경우에만 img_url에 접근
        return {
          letterId: row.letter_id,
          writingPadId: row.writing_pad_id,
          productPic: productPic,
          contents: [
            {
              pageNum: row.content_count,
              content: row.content,
            },
          ],
          productPic: productPic,
        };
      })
    );

    return letters;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const PhotoService = async (s3Url, letterId) => {
  try {
    await photoDao(s3Url, letterId);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const countPhotoService = async (letterId) => {
  try {
    const currentPhotoCount = await countPhotoDao(letterId);
    const photoCount = currentPhotoCount[0].photo_count + 1;
    await updateCountPhotoDao(photoCount, letterId);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const stampService = async (stampId, letterId) => {
  try {
    const result = await stampDao(stampId, letterId);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const confirmLetterService = async (letterId) => {
  try {
    const result = await confirmLetterDao(letterId);
    const formattedResult = result.map((item) => {
      return {
        letterId: item.id,
        writingPadId: item.writing_pad_id,
        writingPadImgUrl: item.pad_img_url,
        contents: [
          {
            pageNum: item.content_count,
            content: item.content,
          },
        ],
        photoCount: item.photo_count,
        photos: [
          {
            photoUrl: item.photo_img_url,
          },
        ],
        stampId: item.stamp_id,
        deliveryAddress: item.delivery_address,
        deliveryAddressDetail: item.delivery_address_detail,
        deliveryPhone: item.delivery_phone,
        deliveryName: item.delivery_name,
        sendAddress: item.send_address,
        sendAddressDetail: item.send_address_detail,
        sendPhone: item.send_phone,
        sendName: item.send_name,
      };
    });
    return formattedResult;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  letterService,
  confirmLetterService,
  stampService,
  checkLetterService,
  checkAndInsertAddressService,
  updateLetterService,
  countPhotoService,
  PhotoService,
};

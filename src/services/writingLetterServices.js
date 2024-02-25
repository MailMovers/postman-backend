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
  countPhotoDao,
  updateCountPhotoDao,
  photoDao,
  delPhotoDao,
  getContentDao,
  getPhotosDao,
  historyLetterDao,
  getPhotoInfoDao,
  prisonAddress,
  nurserySchoolAddress,
  deleteAllContentsByLetterId,
} = require("../models/writingLetterDao");

const { getProductDao } = require("../models/productDao");
const {
  insertDeliveryAddressDao,
  insertSendAddressDao,
} = require("../models/addressDao");
const { getPricesDao, getRecipe } = require("../models/paymentDao");

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
    await deleteAllContentsByLetterId(letterId);

    for (let item of contents) {
      await contentDao(letterId, item.pageNum, item.content);
    }

    const page = contents.length;
    await updateLetterDao(page, letterId);

    return { letterId, page };
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
  deliveryPostCode,
  sendAddress,
  sendAddressDetail,
  sendPhone,
  sendName,
  sendPostCode
) => {
  try {
    const existingDeliveryAddress = await checkExistingDeliveryAddressDao(
      userId,
      deliveryAddress,
      deliveryAddressDetail,
      deliveryPhone,
      deliveryName,
      deliveryPostCode
    );
    const existingSendAddress = await checkExistingSendAddressDao(
      userId,
      sendAddress,
      sendAddressDetail,
      sendPhone,
      sendName,
      sendPostCode
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
        deliveryName,
        deliveryPostCode
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
        sendName,
        sendPostCode
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
    const photoInfo = await photoDao(s3Url, letterId);
    return photoInfo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPhotoInfoService = async (letterId) => {
  try {
    const photoInfo = await getPhotoInfoDao(letterId);
    return photoInfo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const delPhotoService = async (photoId, letterId) => {
  try {
    await delPhotoDao(photoId);
    const currentPhotoCount = await countPhotoDao(letterId);
    const photoCount = currentPhotoCount[0].photo_count - 1;
    await updateCountPhotoDao(photoCount, letterId);
    return;
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
    const PAGE_PRICE = 500;
    const PHOTO_PRICE = 500;
    const MAX_FREE_PAGES = 3;

    const result = await confirmLetterDao(letterId);
    console.log("result", result);
    const writingPadId = result[0].writing_pad_id;
    const stampId = result[0].stamp_id;
    const prices = await getPricesDao([writingPadId], [stampId]);
    console.log("prices:", prices);
    const formattedResult = await Promise.all(
      result.map(async (item) => {
        const writingPadPrice = prices.writingPadPrices[0].writingPadPrice;
        const stampFee = prices.stampFees[0].stampFee;
        const additionalPageCost =
          item.page > MAX_FREE_PAGES
            ? PAGE_PRICE * (item.page - MAX_FREE_PAGES)
            : 0;
        const photoCost = item.photo_count * PHOTO_PRICE;
        const totalCost =
          writingPadPrice + additionalPageCost + photoCost + stampFee;

        const contents = await getContentDao(item.id);
        const photos = await getPhotosDao(item.id);
        console.log("additionalPageCost : ", additionalPageCost);
        return {
          letterId: item.id,
          writingPadId: item.writing_pad_id,
          writingPadImgUrl: item.writing_pad_img_url,
          page: item.page,
          contents: contents.map((content) => ({
            pageNum: content.pageNum, // pageNum을 직접 사용
            content: content.content,
          })),
          photoCount: item.photo_count,
          photos: photos.map((photo) => ({
            photoUrl: photo.img_url,
          })),
          stampId: item.stamp_id,
          point: item.point,
          deliveryAddress: item.delivery_address,
          deliveryAddressDetail: item.delivery_address_detail,
          deliveryPhone: item.delivery_phone,
          deliveryName: item.delivery_name,
          deliveryPostCode: item.delivery_post_code,
          sendAddress: item.send_address,
          sendAddressDetail: item.send_address_detail,
          sendPhone: item.send_phone,
          sendName: item.send_name,
          sendPostCode: item.send_post_code,
          totalCost: totalCost,
        };
      })
    );
    return formattedResult[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const historyLetterService = async (userId, letterId) => {
  try {
    if (letterId) {
      const letterInformation = await confirmLetterDao(letterId);
      const recipe = await getRecipe(letterId);
      const photo = await getPhotoInfoDao(letterId)
      return { letterInformation, recipe, photo };
    }
    const result = await historyLetterDao(userId);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const changeToCamelCase = (data) => {
  return data.map((item) => ({
    id: item.id,
    name: item.name,
    deliveryAddress: item.delivery_address,
    deliveryAddressDetail: item.delivery_address_detail,
    postCode: item.post_code,
  }));
};

const getPrisonAddresses = async () => {
  try {
    const prisons = await prisonAddress();
    return changeToCamelCase(prisons);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getNurserySchoolAddresses = async () => {
  try {
    const nurserySchools = await nurserySchoolAddress();
    return changeToCamelCase(nurserySchools);
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
  delPhotoService,
  historyLetterService,
  getPhotoInfoService,
  getPrisonAddresses,
  getNurserySchoolAddresses,
};

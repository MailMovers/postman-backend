const confirmLettersDao = require("../models/writingLetterDao");
const {
  getPricesDao,
  paymentInsertInfoDao,
  addPointDao,
} = require("../models/paymentDao");

const PAGE_PRICE = 500;
const PHOTO_PRICE = 500;
const MAX_FREE_PAGES = 3;
const ERROR_STATUS = 400;
const POINT_PERCENTAGE = 0.05;

// Function to calculate total cost
const calculateTotal = (userLetters, prices) => {
  let total = 0;
  for (let i = 0; i < userLetters.length; i++) {
    const pagePrice = prices[i].writingPadPrice;
    if (userLetters[i].page > MAX_FREE_PAGES) {
      total += pagePrice + PAGE_PRICE * (userLetters[i].page - MAX_FREE_PAGES);
    } else {
      total += pagePrice;
    }
    total += userLetters[i].photoCount * PHOTO_PRICE;
    total += prices[i].stampFee;
  }
  return total;
};

const paymentSuccessService = async (userId, paymentInfo) => {
  // next parameter added
  try {
    const userLetters = await confirmLettersDao(userId);
    const letterId = userLetters[0].id;

    const writingPadId = userLetters.map((letter) => letter.writing_pad_id);
    const stampId = userLetters.map((letter) => letter.stamps_id);

    const prices = await getPricesDao(writingPadId, stampId);

    const total = calculateTotal(userLetters, prices);

    if (total === Number(paymentInfo.totalAmount)) {
      await paymentInsertInfoDao(paymentInfo, userId, letterId);
      const point = total * POINT_PERCENTAGE;
      await addPointDao(userId, point);
      return { message: "success" };
    } else {
      throw new Error("결제오류");
    }
  } catch (error) {
    console.error("결제 서비스에서 오류 :", error);
    throw error;
  }
};

module.exports = { paymentSuccessService };

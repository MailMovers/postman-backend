const confirmLettersDao = require("../models/writingLetterDao");
const { v4: uuidv4 } = require("uuid");
const {
  getPricesDao,
  paymentInsertInfoDao,
  addPointDao,
  recordPointTransactionDao,
  confirmPoint,
  getPaymentInfoDao,
} = require("../models/paymentDao");

const PAGE_PRICE = 500;
const PHOTO_PRICE = 500;
const MAX_FREE_PAGES = 3;
const POINT_PERCENTAGE = 0.05;

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

const paymentSuccessService = async (userId, paymentInfo, usePoint) => {
  try {
    const userLetters = await confirmLettersDao(userId);
    const letterId = userLetters[0].id;

    const writingPadId = userLetters.map((letter) => letter.writing_pad_id);
    const stampId = userLetters.map((letter) => letter.stamps_id);

    const prices = await getPricesDao(writingPadId, stampId);

    let total = calculateTotal(userLetters, prices);

    if (usePoint) {
      const userPoint = await confirmPoint(userId);
      if (userPoint < total) {
        total -= userPoint;
        await addPointDao(userId, -userPoint);
        await recordPointTransactionDao(userId, -userPoint, "use", "use point");
      } else {
        throw new Error("포인트가 결제 금액보다 많습니다.");
      }
    }

    if (total === Number(paymentInfo.totalAmount)) {
      await paymentInsertInfoDao(paymentInfo, userId, letterId);
      const point = total * POINT_PERCENTAGE;
      await addPointDao(userId, point);
      await recordPointTransactionDao(userId, point, "save", "save");
      return { message: "success" };
    } else {
      throw new Error("결제오류");
    }
  } catch (error) {
    console.error("결제 서비스에서 오류 :", error);
    throw error;
  }
};

const getPaymentInfoService = async (userId) => {
  const order = await getPaymentInfoDao(userId);

  // orderId 생성
  const orderId = uuidv4();

  // orderName 생성
  const orderName = `${order.productName} 외 ${order.productCount}건`;

  // successUrl, failUrl 설정
  const successUrl = "http://localhost:8080/success";
  const failUrl = "http://localhost:8080/fail";

  return {
    orderId,
    orderName,
    successUrl,
    failUrl,
    amount: order.totalAmount,
  };
};

module.exports = { paymentSuccessService, getPaymentInfoService };

const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

const { confirmLetterDao } = require("../models/writingLetterDao");

const { confirmLetterService } = require("./writingLetterServices");

const {
  getPricesDao,
  paymentInsertInfoDao,
  addPointDao,
  recordPointTransactionDao,
  confirmPoint,
  getWritingPadNameByIdDao,
  getStampNameByIdDao,
  getCostomerId,
} = require("../models/paymentDao");

const PAGE_PRICE = 500;
const PHOTO_PRICE = 500;
const MAX_FREE_PAGES = 3;
const POINT_PERCENTAGE = 0.05;

const calculateTotal = async (userLetters, usePoint = 0) => {
  const pricePromises = userLetters.map((letter) =>
    getPricesDao(letter.writing_pad_id, letter.stamp_id)
  );
  const prices = await Promise.all(pricePromises);

  let total = userLetters.reduce((acc, letter, index) => {
    const { writingPadPrice, stampFee } = prices[index];
    let letterTotal = writingPadPrice;
    if (letter.page > MAX_FREE_PAGES) {
      letterTotal += PAGE_PRICE * (letter.page - MAX_FREE_PAGES);
    }
    letterTotal += letter.photo_count * PHOTO_PRICE + stampFee;
    return acc + letterTotal;
  }, 0);

  return total - usePoint;
};

const verifyPayment = async (orderId, amount, paymentKey) => {
  const secretKey = process.env.TOSSPAYMENTS_SECRET_KEY;
  const encryptedSecretKey = Buffer.from(`${secretKey}:`).toString("base64");
  try {
    const response = await axios.post(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        orderId: orderId,
        amount: amount,
        paymentKey: paymentKey,
      },
      {
        headers: {
          Authorization: `Basic ${encryptedSecretKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("결제 확인 중 오류 발생:", error);
    throw error;
  }
};

const paymentSuccessService = async (
  userId,
  letterId,
  orderId,
  amount,
  paymentKey,
  usePoint
) => {
  try {
    const userLetters = await confirmLetterDao(letterId);
    let total = await calculateTotal(userLetters, usePoint);
    console.log(`서버에서 계산된 총액: ${total}, 클라이언트에서 받은 금액: ${amount}`);
    const userPoint = await confirmPoint(userId);
    if (usePoint && userPoint < usePoint) {
      throw new Error("사용 가능한 포인트가 부족합니다.");
    }
    if (usePoint) {
      await addPointDao(userId, -usePoint);
      await recordPointTransactionDao(userId, -usePoint, "use", "use point");
      total -= usePoint;
    }

    const paymentVerification = await verifyPayment(
      orderId,
      amount,
      paymentKey
    );
    if (paymentVerification.status !== "DONE") {
      throw new Error("결제 확인 실패");
    }
    if (total !== Number(amount)) {
      throw new Error("계산된 총액이 결제 금액과 일치하지 않습니다.");
    }
    const approvedAt = new Date().toISOString().replace("T", " ").slice(0, 19);
    await paymentInsertInfoDao(
      {
        orderName: paymentVerification.orderName,
        orderId: paymentVerification.orderId,
        paymentKey: paymentVerification.paymentKey,
        method: paymentVerification.method,
        totalAmount: paymentVerification.totalAmount,
        vat: paymentVerification.vat,
        suppliedAmount: paymentVerification.suppliedAmount,
        approvedAt: approvedAt,
        status: paymentVerification.status,
      },
      userId,
      letterId
    );

    const point = total * POINT_PERCENTAGE;
    await addPointDao(userId, point);
    await recordPointTransactionDao(userId, point, "save", "save point");

    return { message: "success" };
  } catch (error) {
    console.error("결제 서비스에서 오류 :", error);
    throw error;
  }
};
const getPaymentInfoService = async (letterId, userId) => {
  const letterInfo = await confirmLetterService(letterId);
  const customerId = await getCostomerId(userId);
  const totalAmount = letterInfo.totalCost;
  const orderId = uuidv4();

  const writingPadName = await getWritingPadNameByIdDao(
    letterInfo.writingPadId
  );
  const stampName = await getStampNameByIdDao(letterInfo.stampId);
  const orderName = `${writingPadName}, ${letterInfo.page}장 사진 ${letterInfo.photoCount}장 외 ${stampName}우표`;
  const successUrl = "http://localhost:8080/success";
  const failUrl = "http://localhost:8080/fail";

  return {
    customerId,
    orderId,
    orderName,
    successUrl,
    failUrl,
    amount: totalAmount,
  };
};
module.exports = { paymentSuccessService, getPaymentInfoService };

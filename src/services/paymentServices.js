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

const calculateTotal = async (userLetters) => {
  let total = 0;
  for (let i = 0; i < userLetters.length; i++) {
    const priceInfo = await getPricesDao(
      [userLetters[i].writing_pad_id],
      [userLetters[i].stamp_id]
    );

    const writingPadPrice = priceInfo.writingPadPrices.find(
      (p) => p.id === userLetters[i].writing_pad_id
    ).writingPadPrice;
    const stampFee = priceInfo.stampFees.find(
      (p) => p.id === userLetters[i].stamp_id
    ).stampFee;

    if (userLetters[i].page > MAX_FREE_PAGES) {
      total +=
        writingPadPrice + PAGE_PRICE * (userLetters[i].page - MAX_FREE_PAGES);
    } else {
      total += writingPadPrice;
    }

    const photoCost = userLetters[i].photo_count * PHOTO_PRICE;
    total += photoCost;
    total += stampFee;
  }
  return total;
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
    const writingPadId = userLetters[0].writing_pad_id;
    const stampId = userLetters[0].stamp_id;
    const prices = await getPricesDao([writingPadId], [stampId]);

    let total = await calculateTotal(userLetters, prices);

    if (usePoint) {
      const userPoint = await confirmPoint(userId);
      if (userPoint >= total) {
        await addPointDao(userId, -total);
        await recordPointTransactionDao(userId, -total, "use", "use point");
        total = 0;
      } else {
        total -= userPoint;
        await addPointDao(userId, -userPoint);
        await recordPointTransactionDao(userId, -userPoint, "use", "use point");
      }
    }

    const paymentVerification = await verifyPayment(
      orderId,
      amount,
      paymentKey
    );
    if (paymentVerification.status !== "DONE") {
      throw new Error("결제 확인 실패");
    }
    const letterInfo = await confirmLetterService(letterId);
    if (letterInfo.totalCost !== Number(amount)) {
      throw new Error("결제 금액이 일치하지 않습니다.");
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

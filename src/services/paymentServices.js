const { v4: uuidv4 } = require("uuid");

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
    const prices = await getPricesDao([userLetters[i].writing_pad_id], [userLetters[i].stamp_id]);
    const pagePrice = prices[0].writingPadPrice;
    const stampFee = prices[0].stampFee;

    if (userLetters[i].page > MAX_FREE_PAGES) {
      total += pagePrice + PAGE_PRICE * (userLetters[i].page - MAX_FREE_PAGES);
    } else {
      total += pagePrice;
    }
    total += userLetters[i].photoCount * PHOTO_PRICE;
    total += stampFee;
  }
  return total;
};

const paymentSuccessService = async (
  userId,
  letterId,
  paymentInfo,
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
      if (userPoint < total) {
        total -= userPoint;
        await addPointDao(userId, -userPoint);
        await recordPointTransactionDao(userId, -userPoint, "use", "use point");
      } else {
        throw new Error("포인트가 결제 금액보다 많습니다.");
      }
    }
    const {
      orderName,
      orderId,
      paymentKey,
      method,
      totalAmount,
      vat,
      suppliedAmount,
      approvedAt,
      status,
    } = paymentInfo;

    if (total === Number(paymentInfo.totalAmount)) {
      await paymentInsertInfoDao(
        {
          orderName,
          orderId,
          paymentKey,
          method,
          totalAmount,
          vat,
          suppliedAmount,
          approvedAt,
          status,
        },
        userId,
        letterId
      );
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

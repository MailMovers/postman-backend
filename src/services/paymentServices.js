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

const calculateTotal = (userLetters, prices) => {
  let total = 0;
  for (let i = 0; i < userLetters.length; i++) {
    const pagePrice = prices[i].writingPadPrice;
    if (userLetters[i].page > MAX_FREE_PAGES) {
      total += pagePrice + PAGE_PRICE * (userLetters[i].page - MAX_FREE_PAGES);
    } else {
      total += pagePrice;
    }
    total += userLetters[i].photo_count * PHOTO_PRICE;
    total += prices[i].stampFee;
  }
  return total;
};
const paymentSuccessService = async (
  userId,
  letterId,
  { orderId, amount, paymentKey },
  usePoint
) => {
  try {
    // 편지 정보를 확인합니다.
    const userLetters = await confirmLetterDao(letterId);
    if (!userLetters || userLetters.length === 0) {
      throw new Error("userLetters 데이터가 없습니다.");
    }

    // 가격 정보를 가져옵니다.
    const writingPadId = userLetters.map((letter) => letter.writing_pad_id);
    const stampId = userLetters.map((letter) => letter.stamp_id);
    const prices = await getPricesDao(writingPadId, stampId);
    if (!prices || prices.length !== userLetters.length) {
      throw new Error("prices 데이터 검증 오류");
    }

    // 총 결제 금액을 계산합니다.
    let total = calculateTotal(userLetters, prices);

    // 포인트 사용 여부에 따라 처리합니다.
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

    // 주문 정보를 가져와서 검증합니다.
    const letterInfo = await confirmLetterService(letterId);
    if (letterInfo.orderId !== orderId) {
      throw new Error("주문 ID가 일치하지 않습니다.");
    }
    if (letterInfo.totalCost !== Number(amount)) {
      throw new Error("결제 금액이 일치하지 않습니다.");
    }

    // 결제 금액이 일치하는지 확인합니다.
    if (total !== Number(amount)) {
      throw new Error("계산된 총액이 결제 금액과 일치하지 않습니다.");
    }

    // 결제 정보를 데이터베이스에 기록합니다.
    const approvedAt = new Date().toISOString().replace("T", " ").slice(0, 19);
    await paymentInsertInfoDao(
      {
        orderName: `${writingPadName}, ${letterInfo.page}장 사진 ${letterInfo.photoCount}장 외 ${stampName}우표`,
        orderId,
        paymentKey,
        method: "card", // 예시로 'card'를 사용했습니다. 실제 방법을 사용해야 합니다.
        totalAmount: amount,
        vat: Math.floor(Number(amount) * 0.1), // VAT는 10%로 가정했습니다.
        suppliedAmount: Math.floor(Number(amount) * 0.9),
        approvedAt,
        status: "paid", // 예시로 'paid'를 사용했습니다. 실제 상태를 사용해야 합니다.
      },
      userId,
      letterId
    );

    // 포인트를 적립합니다.
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
  const successUrl = "http://localhost:8080/letter/success";
  const failUrl = "http://localhost:8080/letter/fail";

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

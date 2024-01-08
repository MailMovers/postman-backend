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
    total += userLetters[i].photoCount * PHOTO_PRICE;
    total += prices[i].stampFee;
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
    console.log('userLetters:', userLetters); // 데이터 유효성 검사를 위한 로그 추가

    if (!userLetters || userLetters.length === 0) {
      throw new Error('userLetters 데이터가 없습니다.');
    }

    const writingPadId = userLetters.map((letter) => letter.writing_pad_id);
    const stampId = userLetters.map((letter) => letter.stamp_id);

    const prices = await getPricesDao(writingPadId, stampId);
    console.log('prices:', prices); // 데이터 유효성 검사를 위한 로그 추가

    if (!prices || prices.length !== userLetters.length) {
      throw new Error('prices 데이터 검증 오류');
    }

    let total = calculateTotal(userLetters, prices);
    console.log('Calculated total:', total); // 결제 금액 검증을 위한 로그 추가

    if (usePoint) {
      const userPoint = await confirmPoint(userId);
      console.log('User points:', userPoint); // 포인트 사용 로직 검사를 위한 로그 추가

      if (userPoint < total) {
        total -= userPoint;
        await addPointDao(userId, -userPoint);
        await recordPointTransactionDao(userId, -userPoint, "use", "use point");
      } else {
        console.error('포인트가 결제 금액보다 많습니다.'); // 포인트 사용 로직 오류 로그 추가
        throw new Error("포인트가 결제 금액보다 많습니다.");
      }
    }

    console.log('paymentInfo.totalAmount:', paymentInfo.totalAmount); // 결제 금액 검증 로그 추가
    if (total === Number(paymentInfo.totalAmount)) {
      // 결제 정보를 데이터베이스에 기록
      await paymentInsertInfoDao(
        {
          orderName: paymentInfo.orderName,
          orderId: paymentInfo.orderId,
          paymentKey: paymentInfo.paymentKey,
          method: paymentInfo.method,
          totalAmount: paymentInfo.totalAmount,
          vat: paymentInfo.vat,
          suppliedAmount: paymentInfo.suppliedAmount,
          approvedAt: paymentInfo.approvedAt,
          status: paymentInfo.status,
        },
        userId,
        letterId
      );
      const point = total * POINT_PERCENTAGE;
      await addPointDao(userId, point);
      await recordPointTransactionDao(userId, point, "save", "save");
      return { message: "success" };
    } else {
      console.error('결제 금액 불일치 오류'); // 결제 금액 불일치 오류 로그 추가
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

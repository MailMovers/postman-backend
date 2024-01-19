const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

const {
  confirmLetterDao,
  updateLetterStatusDao,
} = require("../models/writingLetterDao");

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
  getPointTransactionsDao
} = require("../models/paymentDao");

const PAGE_PRICE = 500;
const PHOTO_PRICE = 500;
const MAX_FREE_PAGES = 3;
const POINT_PERCENTAGE = 0.05;

const calculateTotal = async (userLetters, usePoint = 0) => {
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
    total -= usePoint;
  }
  console.log(`calculateTotal: 총액=${total}, 사용 포인트=${usePoint}`); // 로그 추가
  return total;
};

const verifyPayment = async (orderId, amount, paymentKey) => {
  const secretKey = process.env.TOSSPAYMENTS_SECRET_KEY;
  const encryptedSecretKey = Buffer.from(`${secretKey}:`).toString("base64");
  try {
    console.log(
      `verifyPayment 호출: orderId=${orderId}, amount=${amount}, paymentKey=${paymentKey}`
    ); // 로그 추가
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
    console.log(`verifyPayment 응답: ${JSON.stringify(response.data)}`); // 로그 추가
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
    const userPoint = await confirmPoint(userId);
    const total = await calculateTotal(userLetters, usePoint);
    if (usePoint && userPoint < usePoint) {
      throw new Error("사용 가능한 포인트가 부족합니다.");
    }
    if (usePoint) {
      await addPointDao(-usePoint, userId);
      await recordPointTransactionDao(
        userId,
        -usePoint,
        "use",
        `${usePoint}포인트 사용`
      );
    }
    if (Number(amount) !== Number(total)) {
      throw new Error(
        "클라이언트로 부터 계산된 총액이 결제 금액과 일치하지 않습니다."
      );
    }
    const paymentVerification = await verifyPayment(orderId, total, paymentKey);

    if (paymentVerification.status !== "DONE") {
      throw new Error("결제 확인 실패");
    }

    if (total !== paymentVerification.totalAmount) {
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
    await addPointDao(point, userId);
    await recordPointTransactionDao(
      userId,
      point,
      "save",
      `${point}포인트 적립`
    );

    await updateLetterStatusDao(letterId);

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

const usePointsForPaymentService = async (
  userId,
  letterId,
  orderId,
  usePoint
) => {
  console.log(`usePointsForPaymentService 호출: userId=${userId}, letterId=${letterId}, orderId=${orderId}, usePoint=${usePoint}`); // 로그 추가
  try {
    // 사용자의 현재 포인트 잔액을 확인
    const userPoints = await confirmPoint(userId);
    if (userPoints < usePoint) {
      throw new Error("사용 가능한 포인트가 부족합니다.");
    }

    // 포인트 차감
    await addPointDao(-usePoint, userId);

    // 포인트 거래 내역 기록
    await recordPointTransactionDao(
      userId,
      -usePoint,
      "use",
      `${usePoint}포인트 사용`
    );

    // 주문 정보에 포인트 결제 정보 추가
    await paymentInsertInfoDao(
      {
        orderName: "포인트 결제",
        orderId: orderId,
        paymentKey: null, // 포인트 결제는 paymentKey가 없음
        method: "point",
        totalAmount: usePoint,
        vat: 0,
        suppliedAmount: usePoint,
        approvedAt: new Date().toISOString().replace("T", " ").slice(0, 19),
        status: "DONE",
      },
      userId,
      letterId
    );

    return { message: "success" };
  } catch (error) {
    console.error("포인트 결제 서비스에서 오류 :", error);
    throw error;
  }
};

const getPointTransactionsService = async (userId) => {
  try {
    const transactions = await getPointTransactionsDao(userId);
    return transactions;
  } catch (error) {
    console.error("포인트 거래 내역 조회 중 오류 발생:", error);
    throw error;
  }
};

module.exports = {
  paymentSuccessService,
  getPaymentInfoService,
  usePointsForPaymentService,
  getPointTransactionsService,
};

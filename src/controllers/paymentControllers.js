const {
  paymentSuccessService,
  getPaymentInfoService,
  getPointTransactionsService,
  usePointsForPaymentService,
} = require("../services/paymentServices");

const paymentSuccessController = async (req, res) => {
  try {
    const userId = req.userId;
    const { orderId, amount, paymentKey } = req.query;
    const { usePoint, letterId } = req.body;
    console.log(
      `orderId: ${orderId}, amount: ${amount}, paymentKey: ${paymentKey}`
    ); // 로그 추가

    await paymentSuccessService(
      userId,
      letterId,
      orderId,
      amount,
      paymentKey,
      usePoint
    );

    res.status(201).json({
      message: "success",
    });
  } catch (error) {
    console.error("결제 성공 컨트롤러에서 오류:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const usePointsForPaymentController = async (req, res) => {
  try {
    const userId = req.userId; // 사용자 인증을 통해 얻은 userId
    const { usePoint, letterId, orderId } = req.body; // 클라이언트로부터 받은 포인트 사용 요청 정보
    console.log("포인트 사용 요청 정보:", usePoint, letterId, orderId);

    // 포인트 결제 서비스 호출
    const result = await usePointsForPaymentService(
      userId,
      letterId,
      orderId,
      usePoint
    );

    // 성공 응답 반환
    res.status(200).json(result);
  } catch (error) {
    // 오류 응답 반환
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getPaymentInfoController = async (req, res) => {
  const userId = req.userId;
  const letterId = req.query.letterId;
  const paymentInfo = await getPaymentInfoService(letterId, userId);
  res.json(paymentInfo);
};

const getPointTransactions = async (req, res) => {
  try {
    const userId = req.userId;
    const transactions = await getPointTransactionsService(userId);
    res.json(transactions);
  } catch (error) {
    console.error("포인트 거래 내역 조회 중 오류:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  paymentSuccessController,
  getPaymentInfoController,
  usePointsForPaymentController,
  getPointTransactions,
};

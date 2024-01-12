const {
  paymentSuccessService,
  getPaymentInfoService,
  getPointTransactionsService,
} = require("../services/paymentServices");

const paymentSuccessController = async (req, res) => {
  try {
    const userId = req.userId;
    const { orderId, amount, paymentKey } = req.query;
    const { usePoint, letterId } = req.body;
    console.log(`orderId: ${orderId}, amount: ${amount}, paymentKey: ${paymentKey}`); // 로그 추가


    await paymentSuccessService(
      userId,
      letterId,
      orderId,
      amount,
      paymentKey,
      usePoint === "true"
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
  getPointTransactions,
};

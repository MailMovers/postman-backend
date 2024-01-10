const {
  paymentSuccessService,
  getPaymentInfoService,
} = require("../services/paymentServices");

const paymentSuccessController = async (req, res) => {
  try {
    const userId = req.userId;
    const { orderId, amount, paymentKey } = req.query;
    const { usePoint, letterId } = req.body;

    console.log("결제 성공 컨트롤러에서 받은 데이터:", {
      userId,
      orderId,
      amount,
      paymentKey,
      usePoint,
      letterId,
    });
    await paymentSuccessService(
      userId,
      letterId,
      { orderId, amount, paymentKey },
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

module.exports = { paymentSuccessController, getPaymentInfoController };

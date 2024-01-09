const axios = require("axios");

const {
  paymentSuccessService,
  getPaymentInfoService,
} = require("../services/paymentServices");

const secretKey = process.env.TOSSPAYMENTS_SECRET_KEY;

const paymentSuccessController = async (req, res) => {
  try {
    const userId = req.userId;
    const { orderId, amount, paymentKey } = req.query;
    const { usePoint, letterId } = req.body;

    // paymentSuccessService 호출
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
    // 오류 처리 로직
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

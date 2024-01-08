const axios = require("axios");

const {
  paymentSuccessService,
  getPaymentInfoService,
} = require("../services/paymentServices");

const secretKey = process.env.TOSSPAYMENTS_SECRET_KEY;

const paymentSuccessController = async (req, res) => {
  try {
    const userId = req.userId;
    const { orderId, amount, paymentKey } = req.query; // usePoint added
    const { usePoint, letterId } = req.body;
    const response = await axios.post(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        orderId,
        amount,
        paymentKey,
      },
      {
        headers: {
          Authorization:
            "Basic " + Buffer.from(secretKey + ":").toString("base64"),
          "Content-Type": "application/json",
        },
        responseType: "json",
      }
    );

    if (response.data.error) {
      console.error("API 응답에서 오류:", response.data.error);
      throw new Error(response.data.error);
    }

    const paymentInfo = response.data;
    await paymentSuccessService(
      userId,
      letterId,
      paymentInfo,
      usePoint === "true"
    ); // usePoint passed

    res.status(201).json({
      message: "success",
    });
  } catch (error) {
    console.error("결제 성공 컨트롤러에서 오류:", error);

    // TODO: 결제 실패 비즈니스 로직 처리
    res.redirect(
      `/fail?code=${error.response?.data?.code || 'UNKNOWN_ERROR'}&message=${error.response?.data?.message || 'Unknown error'}`
    );
  }
};
const getPaymentInfoController = async (req, res) => {
  const userId = req.userId;
  const letterId = req.query.letterId;
  const paymentInfo = await getPaymentInfoService(letterId, userId);
  res.json(paymentInfo);
};

module.exports = { paymentSuccessController, getPaymentInfoController };

const axios = require("axios");

const { paymentSuccessService } = require("../services/paymentServices");

const secretKey = process.env.TOSSPAYMENTS_SECRET_KEY;

const paymentSuccessController = async (req, res) => {
  try {
    const { orderId, amount, paymentKey } = req.query;
    const response = await axios.post(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        headers: {
          Authorization:
            "Basic " + Buffer.from(secretKey + ":").toString("base64"),
          "Content-Type": "application/json",
        },
        json: {
          orderId,
          amount,
          paymentKey,
        },
        responseType: "json",
      }
    );

    if (response.body.error) {
      console.error("API 응답에서 오류:", response.body.error);
      throw new Error(response.body.error);
    }

    try {
      await paymentSuccessService(response);
    } catch (error) {
      console.error("paymentSuccessService에서 오류:", error);
      throw error;
    }

    res.status(201).json({
      message: "완료",
    });
  } catch (error) {
    console.error("결제 성공 컨트롤러에서 오류:", error);

    // TODO: 결제 실패 비즈니스 로직 처리
    res.redirect(
      `/fail?code=${error.response?.body?.code}&message=${error.response?.body?.message}`
    );
  }
};

module.exports = { paymentSuccessController };

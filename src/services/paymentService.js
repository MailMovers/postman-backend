const axios = require("axios");

const confirmPayment = async (paymentData) => {
  try {
    // 여기서 Toss 결제 API와의 통신을 수행
    const response = await axios.post("https://api.tosspayments.com/v1/payments/confirm", {
      // 요청 헤더 및 데이터 구성
    });

    return { success: true, totalAmount: response.body.totalAmount };
  } catch (error) {
    return { success: false, code: error.response?.body?.code, message: error.response?.body?.message };
  }
}

module.exports = { confirmPayment };

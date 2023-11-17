const axios = require("axios")

const { paymentSuccessService } = require("../services/paymentServices");

const secretKey = process.env.TOSSPAYMENTS_SECRET_KEY;

const paymentSuccessController = async (req, res) => {
    try {
        const response = await axios.post("https://api.tosspayments.com/v1/payments/confirm", {
            headers: {
                Authorization:
                    "Basic " + Buffer.from(secretKey + ":").toString("base64"),
                "Content-Type": "application/json",
            },
            json: {
                orderId: req.query.orderId,
                amount: req.query.amount,
                paymentKey: req.query.paymentKey,
            },
            responseType: "json",
        });

        console.log(response.body);
        paymentSuccessService(response);

        res.status(201).json({
            "message": '완료'
        });
    } catch (error) {
        console.error('결제 성공 컨트롤러에서 오류:', error);

        // TODO: 결제 실패 비즈니스 로직 처리
        res.redirect(
            `/fail?code=${error.response?.body?.code}&message=${error.response?.body?.message}`
        );
    }
};

module.exports = {
    paymentSuccessController,
};

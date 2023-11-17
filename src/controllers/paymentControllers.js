const got = require("got");

const { paymentSuccessService } = require("../services/paymentServices")


const paymentSuccessController = async (req, res) => {
    got
        .post("https://api.tosspayments.com/v1/payments/confirm", {
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
        })
        .then(function (response) {
            console.log(response.body)
            paymentSuccessService(response)
            res.status(201).json({
                "message": 'DONE'
            })
        })
        .catch(function (error) {
            // TODO: 구매 실패 비즈니스 로직 구현
            res.redirect(
                `/fail?code=${error.response?.body?.code}&message=${error.response?.body?.message}`
            );
        });
}


module.exports = {
    paymentSuccessController,

}
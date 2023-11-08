const { paymentService } = require("../services")

const processPayment = async (req, res) => {
    try {
        const response = await paymentService.confirmPayment(req.body);
        // TODO: 구매 완료 비즈니스 로직 구현
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = {
    processPayment,
}

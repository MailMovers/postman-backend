
const paymentSuccessService = async (response) => {
    try {
        // 구매완료 비즈니스 로직 구현
        await paymentInsertInfoDao(response)

    } catch {
        console.error("Error in paymentService :", error);
        return {
            success: false,
            message: "Error in paymentService. Please try again later.",
        };
    }


}

module.exports = { paymentSuccessService }
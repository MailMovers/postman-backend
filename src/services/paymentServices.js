
const paymentSuccessService = async (response) => {
    try {
        const check = await confirmLettersDao(userId);
        let total = 0;
        for(let i = 0; i < check.length; i++) {
            if(check[i].page > 3) {
                total += 500 * 3 + 500 * (check[i].page - 3);
            } else {
                total += check[i].page * 500;
            }
            total += check[i].photocount * 500;
            if(check[i].writing_pad_id) {
                const writingPadPrice = await getWritingPadPriceDao(check[i].writing_pad_id);
                total += writingPadPrice;
            }
        }
        // 구매완료 비즈니스 로직 구현
        // letters 에 있는 page 수량으로 편지지 추가 과금 장당 500원
        // letters 에 있는 product 로 price 꺼내와서 가격 추가 
        // letters 에 있는 우표 가져와서 상태별로 가격추가


        
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
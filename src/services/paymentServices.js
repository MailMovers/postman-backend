const PAGE_PRICE = 500;
const PHOTO_PRICE = 500;
const MAX_FREE_PAGES = 3;
const ERROR_STATUS = 400;

const paymentSuccessService = async (response, res) => {
  try {
    const check = await confirmLettersDao(userId);
    let total = 0;

    const writingPadId = check.map((letter) => letter.writing_pad_id);
    const stampId = check.map((letter) => letter.stamps_id);

    const prices = await getPricesDao(writingPadId, stampId);

    for (let i = 0; i < check.length; i++) {
      const pagePrice = prices[i].writingPadPrice;
      if (check[i].page > MAX_FREE_PAGES) {
        total += pagePrice + PAGE_PRICE * (check[i].page - MAX_FREE_PAGES);
      } else {
        total += pagePrice;
      }
      total += check[i].photoCount * PHOTO_PRICE;
      total += prices[i].stampFee;
    }
    if (total === response.totalAmount) {
      await paymentInsertInfoDao(response);
    } else {
      res.status(ERROR_STATUS).json({ message: "결제오류" });
    }
  } catch (error) {
    console.error("Error in paymentService :", error);
    return {
      success: false,
      message: "Error in paymentService. Please try again later.",
    };
  }
};

module.exports = { paymentSuccessService };

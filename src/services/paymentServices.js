const confirmLettersDao = require("../models/writingLetterDao");
const { getPricesDao, paymentInsertInfoDao } = require("../models/paymentDao");

const PAGE_PRICE = 500;
const PHOTO_PRICE = 500;
const MAX_FREE_PAGES = 3;
const ERROR_STATUS = 400;

const paymentSuccessService = async (req, res) => {
  try {
    const userId = req.param.userId;
    const response = req.body;
    const check = await confirmLettersDao(userId);
    const letterId = check.id
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
      await paymentInsertInfoDao(response,userId,letterId);
      return { message: "success" };
    } else {
      res.status(ERROR_STATUS).json({ message: "결제오류" });
    }
  } catch (error) {
    console.error("결제 서비스에서 오류 :", error);
    return {
      success: false,
      message: "결제 서비스에서 오류가 발생했습니다. 나중에 다시 시도해주세요.",
    };
  }
};

module.exports = { paymentSuccessService };

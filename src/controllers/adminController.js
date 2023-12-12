const [updateProductService] = require("../services/adminService");

const updataProductController = async (req, res) => {
  try {
    await updateProductService(
      name,
      imgUrl,
      padImgUrl,
      price,
      addPrice,
      discription,
      productId
    );
    const { name, imgUrl, padImgUrl, price, addPrice, discription, productId } =
      req.body;
    if (name.length === 0) {
      return res.status(400).json({ message: "상품 이름이 없습니다" });
    }
    if (imgUrl.length === 0) {
      return res.status(400).json({ message: "편지봉투 이미지가 없습니다" });
    }
    if (padImgUrl.length === 0) {
      return res.status(400).json({ message: "편지지 이미지가 없습니다" });
    }
    if (price.length === 0) {
      return res.status(400).json({ message: "상품 가격이 없습니다" });
    }
    if (addPrice === 0) {
      return res.status(400).json({ message: "추가금액을 입력해주세요" });
    }
    if (discription === 0) {
      return res.status(400).json({ message: "상품설명을 입력해주세요" });
    }
    if (!productId) {
      return res.status(400).json({ message: "상품 id가 없습니다" });
    }
    return res.status(200).json({ message: "SUSSCE" });
  } catch (err) {
    console.error("updataProductController에서 발생한 오류", err);
    throw err;
  }
};

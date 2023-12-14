const {
  updateProductService,
  getAllAddressService,
} = require("../services/adminService");
const { getUserByIdDao } = require("../models/productDao");
//어드민 상품 수정
const updataProductController = async (req, res) => {
  try {
    const userId = 1;
    const { productId, name, imgUrl, padImgUrl, price, addPrice, discription } =
      req.body;
    if (!userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const user = await getUserByIdDao(userId);
    if (!user || user.user_role_id !== 3) {
      return res.status(400).json({ message: "게시글 수정 권한이 없습니다" });
    }

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
    await updateProductService(
      productId,
      name,
      imgUrl,
      padImgUrl,
      price,
      addPrice,
      discription
    );
    return res.status(200).json({ message: "SUCCESS" });
  } catch (err) {
    console.error("updataProductController에서 발생한 오류", err);
    throw err;
  }
};
//편지안에 주소 전부 불러오기
const getAllAddressController = async (req, res) => {
  try {
    const letterId = req.body.letterId;

    if (!letterId || letterId === 0) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    return res
      .status(200)
      .json({ message: "SUCCES", data: await getAllAddressService(letterId) });
  } catch (err) {
    console.error("getAllAddressController에서 발생한 에러", err);
    throw err;
  }
};

module.exports = { updataProductController, getAllAddressController };

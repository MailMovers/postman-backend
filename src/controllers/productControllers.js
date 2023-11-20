const { insertProductService } = require("../services/productServices");
const { getUserByIdDao } = require("../models/productDao");

const insertProductController = async (req, res, next) => {
  console.log("controllers message : ", req.body);
  try {
    const userId = 2; // 현재 userId 변수를 상수로 선언하고 있음
    const { name, img_url, price, add_price, discription } = req.body;

    if (!userId || userId.length === 0)
      return res.status(400).json({ message: "KEY_ERROR" });

    const user = await getUserByIdDao(userId);
    console.log("controller", user);
    console.log(user.user_role_id);

    // user.role 대신 user.user_role_id를 사용
    if (user && user.user_role_id !== 3) {
      return res.status(400).json({ message: "게시글 작성 권한이 없습니다" });
    }
    if (!name)
      return res.status(400).json({ message: "상품이름을 작성해주세요" });
    if (!img_url)
      return res.status(400).json({ message: "상품이미지를 넣어주세요" });
    if (!price) return res.status(400).json({ message: "가격을 작성해주세요" });
    if (!discription)
      return res.status(400).json({ message: "상품설명을 작성해주세요" });
    return res.status(200).json({
      message: "상품이 등록되었습니다",
      data: await insertProductService(
        name,
        img_url,
        price,
        add_price,
        discription
      ),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  insertProductController,
};

const {
  insertProductService,
  deleteProductService,
  getProductService,
  getProductListService,
} = require("../services/productServices");
const { getUserByIdDao } = require("../models/productDao");
//어드민 계정일 경우에만 상품을 등록할수있습니다.
const insertProductController = async (req, res, next) => {
  try {
    const userId = 1;
    const { name, img_url, price, add_price, discription } = req.body;
    if (!userId || userId.length === 0)
      return res.status(400).json({ message: "KEY_ERROR" });
    const user = await getUserByIdDao(userId);
    console.log("controller", user);
    console.log(user.user_role_id);
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
//어드민 계정일 경우에만 상품을 삭제 할수있습니다.
const deleteProductController = async (req, res, next) => {
  try {
    const userId = 1;
    const productId = req.body.productId;

    if (!userId || userId.length === 0)
      return res.status(400).json({ message: "KEY_ERROR" });
    const user = await getUserByIdDao(userId);

    if (user && user.user_role_id !== 3) {
      return res.status(400).json({ message: "게시글 삭제 권한이 없습니다" });
    }
    if (!productId || productId.length === 0)
      return res.status(400).json({ message: "삭제할 상품을 선택해주세요" });
    return res.status(200).json({
      message: "상품삭제가 완료되었습니다",
      data: await deleteProductService(productId),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
//상품의 상세정보를 가져옵니다.
const getProductController = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    if (!productId || productId.length === 0) {
      return res
        .status(400)
        .json({ message: "게시글 정보가 등록되지 않았습니다" });
    }
    return res.status(200).json({
      message: "GET_PRODUCT",
      data: await getProductService(productId),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
//상품의 목록을 페이지 기준 20개씩 보내줍니다.
const getProductListController = async (req, res, next) => {
  try {
    const page = req.query.page || 1; // 기본값은 1로 설정
    const pageSize = 20; // 페이지당 아이템 수
    const startItem = (page - 1) * pageSize;
    const productList = await getProductListService(startItem, pageSize);
    if (!productList || productList.length === 0) {
      return res
        .status(400)
        .json({ message: "상품 목록을 불러올 수 없습니다" });
    }
    return res.status(200).json({
      message: "상품 목록을 불러왔습니다",
      data: productList,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
module.exports = {
  insertProductController,
  deleteProductController,
  getProductController,
  getProductListController,
};

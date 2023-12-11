const {
  insertProductService,
  deleteProductService,
  getProductService,
  getProductListService,
  insertReviewService,
  getReviewService,
  deleteReviewService,
  getWritingPadService,
} = require("../services/productServices");
const { getUserByIdDao, getUserByReviewDao } = require("../models/productDao");
const { AppDataSource } = require("../models/dataSource");
const { getWritingPadService } = require("../services");
//어드민 계정일 경우에만 상품을 등록할수있습니다.
const insertProductController = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, imgUrl, price, addPrice, discription } = req.body;
    await insertProductService(userId, name, imgUrl, addPrice, discription);
    if (!userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const user = await getUserByIdDao(userId);
    console.log("controller", user);
    console.log(user.user_role_id);
    if (!user || user.user_role_id !== 3) {
      return res.status(400).json({ message: "게시글 작성 권한이 없습니다" });
    }
    if (!name) {
      return res.status(400).json({ message: "상품이름을 작성해주세요" });
    }
    if (!imgUrl) {
      return res.status(400).json({ message: "상품이미지를 넣어주세요" });
    }
    if (!price) {
      return res.status(400).json({ message: "가격을 작성해주세요" });
    }
    if (!discription) {
      return res.status(400).json({ message: "상품설명을 작성해주세요" });
    }
    return res.status(200).json({
      message: "상품이 등록되었습니다",
    });
  } catch (err) {
    console.error("insertProductController에서 생긴 오류", err);
    throw err;
  }
};

//어드민 계정일 경우에만 상품을 삭제 할수있습니다.
const deleteProductController = async (req, res) => {
  try {
    const userId = req.userId;
    const productId = req.body.productId;
    await deleteProductService(productId);
    if (!userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const user = await getUserByIdDao(userId);
    if (!user || user.user_role_id !== 3) {
      return res.status(400).json({ message: "게시글 삭제 권한이 없습니다" });
    }
    if (!productId) {
      return res.status(400).json({ message: "삭제할 상품을 선택해주세요" });
    }
    return res.status(200).json({
      message: "상품 삭제가 완료되었습니다",
    });
  } catch (err) {
    console.error("deleteProductController에서 생긴 오류", err);
    throw err;
  }
};
//상품의 상세정보를 가져옵니다.
const getProductController = async (req, res) => {
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
    console.error("getProductController에서 생긴 오류", err);
    throw err;
  }
};
//상품의 목록을 페이지 기준 20개씩 보내줍니다.
const getProductListController = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = 20;
    const startItem = (page - 1) * pageSize;
    const productList = await getProductListService(startItem, pageSize);

    if (!productList || productList.length === 0) {
      return res.status(400).json({
        message: "상품 목록을 불러올 수 없습니다",
      });
    }
    return res.status(200).json({
      message: "상품 목록을 불러왔습니다",
      data: productList,
    });
  } catch (err) {
    console.error("getProductListController에서 오류:", err);
    throw err; // 에러를 다음 미들웨어로 전달
  }
};
//상품이 배송완료가 되었을때 리뷰를 작성할수 있습니다.
const insertReviewController = async (req, res) => {
  try {
    const userId = req.userId;
    const productId = req.params.productId;
    const { score, content } = req.body;

    await insertReviewService(userId, productId, score, content);
    const user = await getUserByReviewDao(userId);
    if (user.orderStatus !== "done") {
      console.log("리뷰 권한이 없습니다. 주문 상태:", user.oderStatus);
      return res.status(400).json({ message: "리뷰 권한이 없습니다" });
    }
    if (!userId || userId.length === 0)
      return res.status(400).json({ message: "KEY_ERROR" });
    if (!productId || productId.length === 0)
      return res.status(400).json({ message: "상품이 없습니다" });
    if (!content || content.length === 0)
      return res.status(400).json({ message: "글을 작성해주십시요" });

    return res.status(200).json({
      message: "리뷰가 작성되었습니다",
    });
  } catch (err) {
    console.error("insertReviewController에서 생긴 에러", err);
    throw err;
  }
};
//상품 리뷰를 한 페이지당 20개의 댓글을 보여줍니다.
const getReviewController = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = 20;
    const startItem = (page - 1) * pageSize;

    // 여기서 postId 가져오는 부분 확인
    const postId = req.params.productId; // 수정된 부분

    const reviewList = await getReviewService(postId, pageSize, startItem);

    if (!reviewList || reviewList.length === 0)
      return res.status(400).json({ message: "리뷰를 불러올 수 없습니다" });

    return res.status(200).json({
      message: "GET_REVIEW",
      data: reviewList,
    });
  } catch (err) {
    console.error("getReviewController에서 생긴 에러");
    throw err;
  }
};
//유저가 작성한 리뷰를 삭제합니다.
const deleteReviewController = async (req, res) => {
  try {
    const userId = req.userId;
    const reviewId = req.body.reviewId;
    await deleteReviewService(userId, reviewId);

    if (!userId || userId.length === 0)
      return res.status(400).json({ message: "KEY_ERROR" });
    if (!reviewId || reviewId.length === 0)
      return res.status(400).json({ message: "삭제할 리뷰를 선택해주세요" });
    return res.status(200).json({
      message: "리뷰가 삭제되었습니다.",
    });
  } catch (err) {
    console.error("deleteReviewController에서 생긴 에러", err);
    throw err;
  }
};

const getWritingPadController = async (req, res) => {
  try {
    const productId = req.body.productId;
    if (!productId || productId.length === 0)
      return res.status(400).json({ message: "KEY_ERROR" });
    return res
      .status(200)
      .json({ message: "SUCCES", data: getWritingPadService(productId) });
  } catch (err) {
    console.error("getWritingPadController에서 발생한 오류", err);
    throw err;
  }
};

module.exports = {
  insertProductController,
  deleteProductController,
  getProductController,
  getProductListController,
  insertReviewController,
  getReviewController,
  deleteReviewController,
  getWritingPadController,
};

const {
  insertProductService,
  deleteProductService,
  getProductService,
  getProductListService,
  insertReviewService,
  getReviewService,
  deleteReviewService,
  getWritingPadService,
  getProductCategoriService,
  getReviewListService,
} = require("../services/productServices");
const {
  getUserByIdDao,
  getUserByReviewDao,
  getCountProductListDao,
  getReviewCountDao,
  deleteMyReviewDao,
} = require("../models/productDao");

//어드민 계정일 경우에만 상품을 등록할수있습니다.
const insertProductController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const {
      name,
      imgUrl1,
      imgUrl2,
      imgUrl3,
      imgUrl4,
      imgUrl5,
      descriptionImgUrl,
      padImgUrl,
      price,
      addPrice,
      description,
      category,
    } = req.body;
    await insertProductService(
      name,
      imgUrl1,
      imgUrl2,
      imgUrl3,
      imgUrl4,
      imgUrl5,
      descriptionImgUrl,
      padImgUrl,
      price,
      addPrice,
      description,
      category
    );
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
    if (!imgUrl1) {
      return res.status(400).json({ message: "상품이미지를 넣어주세요" });
    }
    if (!padImgUrl) {
      return res.status(400).json({ message: "편지지 이미지가 없습니다" });
    }
    if (!price) {
      return res.status(400).json({ message: "가격을 작성해주세요" });
    }
    if (!description) {
      return res.status(400).json({ message: "상품설명을 작성해주세요" });
    }
    if (!category) {
      return res.statrs(400).json({ message: "카테고리를 작성해주세요" });
    }
    return res.status(200).json({
      message: "SUCCESS",
    });
  } catch (err) {
    console.error("insertProductController에서 생긴 오류", err);
    next(err);
  }
};

//어드민 계정일 경우에만 상품을 삭제 할수있습니다.
const deleteProductController = async (req, res, next) => {
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
      message: "SUCCESS",
    });
  } catch (err) {
    console.error("deleteProductController에서 생긴 오류", err);
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
      message: "SUCCESS",
      data: await getProductService(productId),
    });
  } catch (err) {
    console.error("getProductController에서 생긴 오류", err);
    next(err);
  }
};
//상품의 목록을 페이지 기준 8개씩 보내줍니다.
const getProductListController = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const pageSize = 8;
    const startItem = (page - 1) * pageSize;
    const productList = await getProductListService(startItem, pageSize);
    const count = await getCountProductListDao();
    if (!productList || productList.length === 0) {
      return res.status(400).json({
        message: "상품 목록을 불러올 수 없습니다",
      });
    }
    return res.status(200).json({
      message: "SUCCESS",
      count: count,
      data: productList,
    });
  } catch (err) {
    console.error("getProductListController에서 오류:", err);
    next(err); // 에러를 다음 미들웨어로 전달
  }
};
//상품이 배송완료가 되었을때 리뷰를 작성할수 있습니다.
const insertReviewController = async (req, res, next) => {
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
      message: "SUCCESS",
    });
  } catch (err) {
    console.error("insertReviewController에서 생긴 에러", err);
    next(err);
  }
};
//상품 리뷰를 한 페이지당 10개의 댓글을 보여줍니다.
const getReviewController = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const pageSize = 10;
    const startItem = (page - 1) * pageSize;

    // 여기서 postId 가져오는 부분 확인
    const productId = req.params.productId; // 수정된 부분

    const reviewList = await getReviewService(productId, pageSize, startItem);

    if (!reviewList || reviewList.length === 0)
      return res.status(400).json({ message: "리뷰를 불러올 수 없습니다" });

    return res.status(200).json({
      message: "SUCCESS",
      data: reviewList,
    });
  } catch (err) {
    console.error("getReviewController에서 생긴 에러");
    next(err);
  }
};
//유저가 작성한 리뷰를 삭제합니다.
const deleteReviewController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const reviewId = req.body.reviewId;
    await deleteReviewService(userId, reviewId);

    if (!userId || userId.length === 0)
      return res.status(400).json({ message: "KEY_ERROR" });
    if (!reviewId || reviewId.length === 0)
      return res.status(400).json({ message: "삭제할 리뷰를 선택해주세요" });
    return res.status(200).json({
      message: "SUCCESS",
    });
  } catch (err) {
    console.error("deleteReviewController에서 생긴 에러", err);
    next(err);
  }
};

//내가 작성한 리뷰 삭제하기
const deleteMyreviewController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { reviewId, productId } = req.body;
    await deleteMyReviewDao(userId, reviewId, productId);
    if (!reviewId || reviewId.length === 0) {
      return res.status(400).json({ message: "삭제할 리뷰를 선택해주세요" });
    } else if (!productId || productId.length === 0) {
      return res.status(400).json({ message: "상품 아이디가 없습니다" });
    }
    return res.status(200).json({ message: "SUCCESS" });
  } catch (err) {
    console.error("deleteMtreviewController에서 발생한 오류", err);
    next(err);
  }
};
// getWritingPadController
const getWritingPadController = async (req, res, next) => {
  try {
    const productId = req.params.productId; // 수정된 부분
    if (!productId) return res.status(400).json({ message: "KEY_ERROR" });
    return res.status(200).json({
      message: "SUCCESS",
      data: await getWritingPadService(productId),
    });
  } catch (err) {
    console.error("getWritingPadController에서 발생한 오류", err);
    next(err);
  }
};
//카테고리 불러오기
const getProductCategoriController = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const pageSize = 8;
    const startItem = (page - 1) * pageSize;
    const category = req.query.category; // req.params.category 대신 req.query.category 사용
    const productList = await getProductCategoriService(
      startItem,
      pageSize,
      category
    );
    if (!productList || productList.length === 0) {
      return res.status(400).json({
        message: "상품 목록을 불러올 수 없습니다",
      });
    }
    return res.status(200).json({
      message: "SUCCESS",
      data: productList,
    });
  } catch (err) {
    console.error("getProductCategoriController에서 오류:", err);
    next(err);
  }
};
//내가 작성한 리뷰 불러오기
const getReviewListController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const page = req.query.page || 1;
    const pageSize = 6;
    const startItem = (page - 1) * pageSize;
    const myReviews = await getReviewListService(startItem, pageSize, userId);

    if (!myReviews || myReviews.length === 0) {
      return res.status(400).json({ message: "NO_DATA" });
    }
    return res.status(200).json({
      message: "SUCCESS",
      data: myReviews,
    });
  } catch (err) {
    console.error("getReviewListController에서 발생한 오류", err);
    next(err);
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
  getProductCategoriController,
  getReviewListController,
  deleteMyreviewController,
};

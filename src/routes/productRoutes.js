const express = require("express");
const { productController } = require("../controllers");
const auth = require("../middlewares/auth.middleware");

const {
  getProductController,
  getProductListController,
  insertReviewController,
  getReviewController,
  deleteReviewController,
  getWritingPadController,
  getProductCategoriController,
  getReviewListController,
  deleteMyreviewController,
} = productController;
const productRoute = express.Router();

//내가 작성한 상품 리뷰 불러오기
productRoute.get("/myReviews", auth, getReviewListController);
//내가 작성한 리뷰 삭제
productRoute.post("/deleteReview", auth, deleteMyreviewController);
//카테고리 별 불러오기
productRoute.get("/category", getProductCategoriController);
//상품 상세보기
productRoute.get("/:productId", getProductController);
//편지지 이미지 불러오기
productRoute.get("/writing/:productId", auth, getWritingPadController);
//상품 리스트 보기
productRoute.get("/", getProductListController);
//리뷰 작성
productRoute.post("/:productId", auth, insertReviewController);
//상품리뷰 목록보기
productRoute.get("/:productId/review", getReviewController);
//리뷰 삭제
productRoute.post("/:productId/review/delete", auth, deleteReviewController);
module.exports = { productRoute };

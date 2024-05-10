const express = require("express");
const { productController } = require("../controllers");
const auth = require("../middlewares/auth.middleware");
const { populate } = require("dotenv");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const {
  getProductController,
  getProductListController,
  insertReviewController,
  getReviewController,
  deleteReviewController,
  getWritingPadController,
  getProductCategoriController,
  getReviewListController,
  newProductController,
  popularProductContoller,
  deleteMyreviewController,
  getPreSignedUrlController,
  getMainReviewsController,
} = productController;
const productRoute = express.Router();

productRoute.post('/presignedUrl', upload.single('file'), getPreSignedUrlController);
//내가 작성한 상품 리뷰 불러오기
productRoute.get("/myReviews", auth, getReviewListController);
//내가 작성한 리뷰 삭제
productRoute.post("/deleteReview", auth, deleteMyreviewController);
//카테고리 별 불러오기
productRoute.get("/category", getProductCategoriController);
//편지지 신상 Created_at
productRoute.get("/new", newProductController);
//편지지 인기 Scroe
productRoute.get("/popular", popularProductContoller);
//메인화면 리뷰 불러오기
productRoute.get("/reviewsList", getMainReviewsController)
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

//편지지 추천 Price

module.exports = { productRoute };

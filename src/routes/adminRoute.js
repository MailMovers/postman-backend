const express = require("express");
const auth = require("../middlewares/auth.middleware");

const {
  updataProductController,
  getAllAddressController,
  insertNoticeController,
  updateNoticeController,
  getNoticeDetailController,
  getNoticeListController,
  deleteNoticeController,
  getCsaListController,
  getLetterController,
  getPhotoController,
  getAddressController,
  adminDeleteReviewController,
  getProductReviewlistController,
  adminCsDetailController,
} = require("../controllers/adminController");

const {
  insertProductController,
  deleteProductController,
} = require("../controllers/productControllers");

const {
  adminCsDeleteController,
  insertCsAnswerController,
  getCslistController,
} = require("../controllers/csControllers");

const adminRoute = express.Router();

//상품 등록
adminRoute.post("/insertProduct", auth, insertProductController);
//상품 수정
adminRoute.post("/updateProduct", auth, updataProductController);
//상품 삭제
adminRoute.post("/deleteProduct", auth, deleteProductController);
// //상품 리뷰삭제
adminRoute.post("/deleteProductReview", auth, adminDeleteReviewController);
// //상품 리뷰 불러오기
adminRoute.get("/getProductReviewList", auth, getProductReviewlistController);
//편지 주소 불러오기
adminRoute.get("/letterAddress", auth, getAllAddressController);
//공지사항 입력
adminRoute.post("/notice", auth, insertNoticeController);
//공지사항 수정
adminRoute.post("/updateNotice", auth, updateNoticeController);
//공지사항 글 상세 불러오기
adminRoute.post("/noticeDetail", auth, getNoticeDetailController);
//공지사항 글 목록 불러오기
adminRoute.get("/noticeList", auth, getNoticeListController);
//공지사항 게시글 삭제하기
adminRoute.post("/deleteNotice", auth, deleteNoticeController);
//고객센터 게시글 삭제하기
adminRoute.post("/deleteCustomerService", auth, adminCsDeleteController);
//고색센터 게시글 답변달기
adminRoute.post("/insertCustomerServiceAnwser", auth, insertCsAnswerController);
//고객센터 게시글 목록 불러오기
adminRoute.get("/getCustomerServiceList", auth, getCslistController);
//고객센터 게시글 상세 불러오기
adminRoute.get("/getCustomerService", auth, adminCsDetailController);
//고객센터 답변목록 불러오기
adminRoute.get("/getCsAnswerList", auth, getCsaListController);

// -- 작성 편지 정보 불러오기 --
// TODO : 편지에 첨부된 사진 불러오기, 고객이 작성한 편지 내용 불러오기, 발신지와 수신지 주소 불러오기 및 우표 정보 불러오기

// 편지 내용 불러오기
// adminRoute.get("/letter", auth, getLetterController);
// // 사진 내용 불러오기
// adminRoute.get("/photo", auth, getPhotoController);

module.exports = adminRoute;

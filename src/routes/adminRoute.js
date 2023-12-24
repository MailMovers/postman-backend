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
  adminGetCsDetailController,
} = require("../controllers/adminController");

const {
  insertProductController,
  deleteProductController,
  deleteReviewController,
} = require("../controllers/productControllers");

const {
  adminCsDeleteController,
  insertCsAnswerController,
  getCslistController,
  getCsDetailController,
} = require("../controllers/csControllers");

const adminRoute = express.Router();

//상품 등록
adminRoute.post("/insertProduct", auth, insertProductController);
//상품 수정
adminRoute.post("/updateProduct", auth, updataProductController);
//상품 삭제
adminRoute.post("/deleteProduct", auth, deleteProductController);
//상품 리뷰삭제
adminRoute.post("/deleteProductReview", auth, deleteReviewController);
//편지 주소 불러오기
adminRoute.get("/letterAddress", auth, getAllAddressController);
//공지사항 입력
adminRoute.post("/notice", auth, insertNoticeController);
//공지사항 수정
adminRoute.post("/updateNotice", auth, updateNoticeController);
//공지사항 글 상세 불러오기
adminRoute.get("/noticeDetail", auth, getNoticeDetailController);
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
adminRoute.get("/getCustomerService", auth, getCsDetailController);
//고객센터 답변목록 불러오기
adminRoute.get("/getCsAnswerList", auth, adminGetCsDetailController);
module.exports = adminRoute;

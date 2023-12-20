const express = require("express");
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
adminRoute.post("/insertProduct", insertProductController);
//상품 수정
adminRoute.post("/updateProduct", updataProductController);
//상품 삭제
adminRoute.post("/deleteProduct", deleteProductController);
//상품 리뷰삭제
adminRoute.post("/deleteProductReview", deleteReviewController);
//편지 주소 불러오기
adminRoute.get("/letterAddress", getAllAddressController);
//공지사항 입력
adminRoute.post("/notice", insertNoticeController);
//공지사항 수정
adminRoute.post("/updateNotice", updateNoticeController);
//공지사항 글 상세 불러오기
adminRoute.get("/noticeDetail", getNoticeDetailController);
//공지사항 글 목록 불러오기
adminRoute.get("/noticeList", getNoticeListController);
//공지사항 게시글 삭제하기
adminRoute.post("/deleteNotice", deleteNoticeController);
//고객센터 게시글 삭제하기
adminRoute.post("/deleteCustomerService", adminCsDeleteController);
//고색센터 게시글 답변달기
adminRoute.post("/insertCustomerServiceAnwser", insertCsAnswerController);
//고객센터 게시글 목록 불러오기
adminRoute.get("/getCustomerServiceList", getCslistController);
//고객센터 게시글 상세 불러오기
adminRoute.get("/getCustomerService", getCsDetailController);
//고객센터 답변목록 불러오기
adminRoute.get("/getCsAnswerList", adminGetCsDetailController);
module.exports = adminRoute;

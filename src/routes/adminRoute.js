const express = require("express");
const {
  updataProductController,
  getAllAddressController,
  insertNoticeController,
  updateNoticeController,
  getNoticeDetailController,
  getNoticeListController,
  deleteNoticeController,
} = require("../controllers/adminController");

const adminRoute = express.Router();
//상품 수정
adminRoute.post("/updateProduct", updataProductController);
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

module.exports = adminRoute;

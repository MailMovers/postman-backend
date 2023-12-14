const express = require("express");
const {
  insertCsController,
  insertCsAnswerController,
  getCsDetailController,
  getCslistController,
  deleteCsController,
  adminCsDeleteController,
  adminDeleteCsAnswerController,
  getCsAnswerListController,
} = require("../controllers/csControllers");

const csRoute = express.Router();
//문의하기 글 작성
csRoute.post("/", insertCsController);
//문의하기 답변 작성
csRoute.post("/answer", insertCsAnswerController);
//문의 내역 상세보기
csRoute.get("/detail", getCsDetailController);
//문의 내역 리스트 보기
csRoute.get("/", getCslistController);
//게시글 삭제하기
csRoute.post("/delete", deleteCsController);
//어드민 게시글 삭제하기
csRoute.post("/admin/delete", adminCsDeleteController);
//어드민 답변 삭제
csRoute.post("/admin/delete/answer", adminDeleteCsAnswerController);
//답변 불러오기
csRoute.get("/answer", getCsAnswerListController);

module.exports = csRoute;

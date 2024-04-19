const express = require("express");
const auth = require("../middlewares/auth.middleware");

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
csRoute.post("/", auth, insertCsController);
//문의하기 답변 작성
csRoute.post("/answer", auth, insertCsAnswerController);
//문의 내역 상세보기
csRoute.get("/detail", auth, getCsDetailController);
//문의 내역 리스트 보기
csRoute.get("/", auth, getCslistController);
//게시글 삭제하기
csRoute.post("/delete", auth, deleteCsController);
//어드민 게시글 삭제하기
csRoute.post("/admin/delete", auth, adminCsDeleteController);
//어드민 답변 삭제
csRoute.post("/admin/delete/answer", auth, adminDeleteCsAnswerController);
//답변 불러오기
csRoute.get("/answer", auth, getCsAnswerListController);

module.exports = csRoute;

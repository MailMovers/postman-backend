const express = require("express");
const {
  updataProductController,
  getAllAddressController,
} = require("../controllers/adminController");

const adminRoute = express.Router();
//상품 수정
adminRoute.post("/updateProduct", updataProductController);
//편지 주소 불러오기
adminRoute.get("/letterAddress", getAllAddressController);

module.exports = adminRoute;

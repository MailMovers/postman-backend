const express = require("express");
const { productController } = require("../controllers");

const {
  insertProductController,
  deleteProductController,
  getProductController,
  getProductListController,
  insertReviewController,
  getReviewController,
  deleteReviewController,
  getWritingPadController,
} = productController;
const productRoute = express.Router();

productRoute.post("/", insertProductController);
productRoute.post("/delete", deleteProductController);
productRoute.get("/:productId", getProductController);
productRoute.get("/", getProductListController);
productRoute.post("/:productId", insertReviewController);
productRoute.get("/:productId/review", getReviewController);
productRoute.post("/:productId/review/delete", deleteReviewController);
productRoute.get("/writing/:productId", getWritingPadController);

module.exports = { productRoute };

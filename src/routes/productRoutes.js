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
const auth = require("../middlewares/auth.middleware");

productRoute.post("/", auth, insertProductController);
productRoute.post("/delete", auth, deleteProductController);
productRoute.get("/:productId", auth, getProductController);
productRoute.get("/", auth, getProductListController);
productRoute.post("/:productId", auth, insertReviewController);
productRoute.get("/:productId/review", auth, getReviewController);
productRoute.post("/:productId/review/delete", auth, deleteReviewController);
productRoute.get("/writing", auth, getWritingPadController);

module.exports = { productRoute };

//상품등록
const {
  insertProductDao,
  deleteProductDao,
  getProductDao,
  getProductListDao,
} = require("../models/productDao");

const insertProductService = async (
  name,
  img_url,
  price,
  add_price,
  discription
) => {
  return await insertProductDao(name, img_url, price, add_price, discription);
};
//상품삭제
const deleteProductService = async (productId) => {
  return await deleteProductDao(productId);
};
//상품상세불러오기
const getProductService = async (productId) => {
  return await getProductDao(productId);
};
//상품 리스트 불러오기
const getProductListService = async (startItem, pageSize) => {
  return await getProductListDao(startItem, pageSize);
};
module.exports = {
  insertProductService,
  deleteProductService,
  getProductService,
  getProductListService,
};

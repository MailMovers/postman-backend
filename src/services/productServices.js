//상품등록
const {
  insertProductDao,
  deleteProductDao,
  getProductDao,
  getProductListDao,
  insertReviewDao,
  getReviewDao,
  deleteReviewDao,
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
//상품 리뷰작성
const insertReviewService = async (userId, productId, score, content) => {
  return await insertReviewDao(userId, productId, score, content);
};
//상품 리뷰 불러오기
const getReviewService = async (postId, pageSize, startItem) => {
  // getReviewDao 함수의 반환값을 reviewList 변수에 할당
  const reviewList = await getReviewDao(startItem, pageSize, postId);
  // 여기서부터는 reviewList 변수를 사용할 수 있음
  const filterReviewList = reviewList.filter(
    (reviews) => reviews.deleted_at === null
  );
  return filterReviewList;
};

//상품 리뷰 삭제
const deleteReviewService = async (userId, reviewId) => {
  return await deleteReviewDao(userId, reviewId);
};

module.exports = {
  insertProductService,
  deleteProductService,
  getProductService,
  getProductListService,
  insertReviewService,
  getReviewService,
  deleteReviewService,
};

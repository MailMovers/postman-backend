//상품등록
const {
  insertProductDao,
  deleteProductDao,
  getProductDao,
  getProductListDao,
  insertReviewDao,
  getReviewDao,
  deleteReviewDao,
  getWritingPadDao,
  getReviewListDao,
  getCategoryListWithCountDao,
  newProductDao,
  popularProductDao,
} = require("../models/productDao");

const insertProductService = async (
  name,
  imgUrl,
  padImgUrl,
  price,
  addPrice,
  discription,
  descriptionId
) => {
  await insertProductDao(
    name,
    imgUrl,
    padImgUrl,
    price,
    addPrice,
    discription,
    descriptionId
  );
};
//상품삭제
const deleteProductService = async (productId) => {
  await deleteProductDao(productId);
};
//상품상세불러오기
const getProductService = async (productId) => {
  return await getProductDao(productId);
};
//상품 리스트 불러오기
const getProductListService = async (startItem, pageSize) => {
  try {
    const productList = await getProductListDao(startItem, pageSize);
    const filterProductList = productList.filter(
      (writing_pads) => writing_pads.deleted_at === null
    );
    return filterProductList;
  } catch (error) {
    console.error("getProductListService에서 오류:", error);
    throw error; // 이 부분에서 오류를 다시 throw하여 상위에서 처리할 수 있도록 함
  }
};
//상품 리뷰작성
const insertReviewService = async (
  userId,
  productId,
  score,
  content,
  letterId
) => {
  await insertReviewDao(userId, productId, score, content, letterId);
};
//상품 리뷰 불러오기
const getReviewService = async (productId, pageSize, startItem) => {
  try {
    const reviewData = await getReviewDao(startItem, pageSize, productId);
    return reviewData;
  } catch (err) {
    console.error("getReviewService에서 발생한 에러", err);
    throw err;
  }
};

//상품 리뷰 삭제
const deleteReviewService = async (userId, reviewId) => {
  await deleteReviewDao(userId, reviewId);
};
//편지지 이미지 가져오기
const getWritingPadService = async (productId) => {
  return await getWritingPadDao(productId);
};
//카테고리 별로 상품 불러오기
const getProductCategoriService = async (startItem, pageSize, category) => {
  try {
    const productList = await getCategoryListWithCountDao(
      startItem,
      pageSize,
      category
    );
    return productList;
  } catch (error) {
    console.error("getProductCategoriService에서 오류:", error);
    throw error;
  }
};

const getReviewListService = async (startItem, pageSize, userId) => {
  return await getReviewListDao(startItem, pageSize, userId);
};

const newProductService = async () => {
  const products = await newProductDao();
  return products.map((product) => ({
    id: product.id,
    imgUrl: product.img_url_1,
    name: product.name,
    description: product.description,
  }));
};
const popularProductService = async () => {
  const products = await popularProductDao();
  return products.map((product) => ({
    id: product.id,
    imgUrl: product.img_url_1,
    name: product.name,
    description: product.description,
  }));
};

module.exports = {
  insertProductService,
  deleteProductService,
  getProductService,
  getProductListService,
  insertReviewService,
  getReviewService,
  deleteReviewService,
  getWritingPadService,
  getProductCategoriService,
  getReviewListService,
  newProductService,
  popularProductService,
};

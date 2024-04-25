const {
  upDateProductDao,
  getLetterAddressDao,
  insertNoticeDao,
  updateNoticeDao,
  getNoticeDetailDao,
  getNoticeListDao,
  deleteNoticeDao,
  adminDeleteReview,
  getProductReviewListDao,
  adminCsDetailDao,
  getCsaListDao,
  getPhotoDao,
  getLetterDao,
  getLettersInfoDao,
  insertRegistrationDao,
  changeStatusDao,
  getLettersByDateTimeRangeDao
} = require("../models/adminDao");
//어드민 상품 수정
const updateProductService = async (
  name,
  imgUrl1,
  imgUrl2,
  imgUrl3,
  imgUrl4,
  imgUrl5,
  descriptionImgUrl,
  padImgUrl,
  price,
  addPrice,
  description,
  category,
  productId
) => {
  return await upDateProductDao(
    name,
    imgUrl1,
    imgUrl2,
    imgUrl3,
    imgUrl4,
    imgUrl5,
    descriptionImgUrl,
    padImgUrl,
    price,
    addPrice,
    description,
    category,
    productId
  );
};
const getLettersService = async (startDate, endDate) => {
  if ((startDate, endDate)) {
    return await getLettersByDateTimeRangeDao(startDate, endDate);
  }
  return await getLettersInfoDao();
};

//편지안에 주소 모두 불러오기
const getAllAddressService = async (letterId) => {
  return await getLetterAddressDao(letterId);
};

const getPhotoService = async (letterId) => {
  return await getPhotoDao(letterId);
};

const getLetterService = async (letterId) => {
  try {
    const result = await getLetterDao(letterId);
    if (result.length > 0) {
      const formattedResult = {
        id: result[0].id,
        page: result[0].page,
        contents: result.map((item) => ({
          content: item.content,
          contentPage: item.content_count,
        })),
      };
      return formattedResult;
    }
  } catch (error) {
    console.error;
    throw error;
  }
};

//공지사항 입력
const insertNoticeService = async (title, content, userId) => {
  return await insertNoticeDao(title, content, userId);
};

//공지사항 수정
const updateNoticeService = async (title, content, postId) => {
  return await updateNoticeDao(title, content, postId);
};
//공지사항 상세 불러오기
const getNoticeDetailService = async (postId) => {
  return await getNoticeDetailDao(postId);
};
//공지사항 목록 불러오기
const getNoticeListService = async (startItem, pageSize) => {
  return await getNoticeListDao(startItem, pageSize);
};
//공지사항 게시글 삭제하기
const deleteNoticeService = async (postId) => {
  return await deleteNoticeDao(postId);
};

const adminDeleteReviewService = async (reviewId, productId) => {
  return await adminDeleteReview(reviewId, productId);
};

const getProductReviewService = async (productId) => {
  return await getProductReviewListDao(productId);
};

const adminCsDetailService = async (customrServiceId) => {
  return await adminCsDetailDao(customrServiceId);
};

const getCsaListService = async (customerServiceId) => {
  return await getCsaListDao(customerServiceId);
};

const insertRegistrationService = async (numberOfRegistration, letterId) => {
  return await insertRegistrationDao(numberOfRegistration, letterId);
};

const changeStatusService = async (letterId) => {
  return await changeStatusDao(letterId);
};

module.exports = {
  updateProductService,
  getAllAddressService,
  insertNoticeService,
  updateNoticeService,
  getNoticeDetailService,
  getNoticeListService,
  deleteNoticeService,
  adminDeleteReviewService,
  getProductReviewService,
  adminCsDetailService,
  getCsaListService,
  getPhotoService,
  getLetterService,
  getLettersService,
  insertRegistrationService,
  changeStatusService,
};

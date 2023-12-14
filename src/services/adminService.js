const {
  upDateProductDao,
  getLetterAddressDao,
  insertNoticeDao,
  updateNoticeDao,
  getNoticeDetailDao,
  getNoticeListDao,
  deleteNoticeDao,
} = require("../models/adminDao");
//어드민 상품 수정
const updateProductService = async (
  productId,
  name,
  imgUrl,
  padImgUrl,
  price,
  addPrice,
  discription
) => {
  return await upDateProductDao(
    productId,
    name,
    imgUrl,
    padImgUrl,
    price,
    addPrice,
    discription
  );
};
//편지안에 주소 모두 불러오기
const getAllAddressService = async (letterId) => {
  return await getLetterAddressDao(letterId);
};

//공지사항 입력
const insertNoticeService = async (title, content, userId) => {
  return await insertNoticeDao(title, content, userId);
};

//공지사항 수정
const updateNoticeService = async (title, content, userId) => {
  return await updateNoticeDao(title, content, userId);
};
//공지사항 상세 불러오기
const getNoticeDetailService = async (postId) => {
  return await getNoticeDetailDao(postId);
};
//공지사항 목록 불러오기
const getNoticeListService = async (startItem, pageSize) => {
  try {
    const noticeList = await getNoticeListDao(startItem, pageSize);
    const filterNoticeList = noticeList.filter(
      (notice) => notice.deleted_at === null
    );
    return filterNoticeList;
  } catch (err) {
    console.error("getNoticeListService에서 발생한 오류", err);
    throw err;
  }
};
//공지사항 게시글 삭제하기
const deleteNoticeService = async (postId) => {
  return await deleteNoticeDao(postId);
};

module.exports = {
  updateProductService,
  getAllAddressService,
  insertNoticeService,
  updateNoticeService,
  getNoticeDetailService,
  getNoticeListService,
  deleteNoticeService,
};

const {
  updateProductService,
  getAllAddressService,
  insertNoticeService,
  updateNoticeService,
  getNoticeDetailService,
  getNoticeListService,
  deleteNoticeService,
  adminDeleteReviewService,
  getProductReviewService,
} = require("../services/adminService");
const { getCsDetailService } = require("../services/csServices");
const { getUserByIdDao } = require("../models/productDao");
//어드민 상품 수정
const updataProductController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const {
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
    } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const user = await getUserByIdDao(userId);
    if (!user || user.user_role_id !== 3) {
      return res.status(400).json({ message: "게시글 수정 권한이 없습니다" });
    }

    if (name.length === 0) {
      return res.status(400).json({ message: "상품 이름이 없습니다" });
    }
    if (imgUrl1.length === 0) {
      return res.status(400).json({ message: "편지봉투 이미지가 없습니다" });
    }
    if (padImgUrl.length === 0) {
      return res.status(400).json({ message: "편지지 이미지가 없습니다" });
    }
    if (price.length === 0) {
      return res.status(400).json({ message: "상품 가격이 없습니다" });
    }
    if (addPrice === 0) {
      return res.status(400).json({ message: "추가금액을 입력해주세요" });
    }
    if (description === 0) {
      return res.status(400).json({ message: "상품설명을 입력해주세요" });
    }
    if (!productId) {
      return res.status(400).json({ message: "상품 id가 없습니다" });
    }
    if (!category) {
      return res.status(400).json({ message: "카테고리를 작성해주세요" });
    }
    await updateProductService(
      productId,
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
      category
    );
    return res.status(200).json({ message: "SUCCESS" });
  } catch (err) {
    console.error("updataProductController에서 발생한 오류", err);
    next(err);
  }
};

//편지안에 주소 전부 불러오기
const getAllAddressController = async (req, res, next) => {
  try {
    const letterId = req.body.letterId;

    if (!letterId || letterId === 0) {
      return res.status(422).json({ message: "Invalid or missing letterId" });
    }
    const data = await getAllAddressService(letterId);

    return res.status(200).json({ message: "SUCCESS", data });
  } catch (err) {
    console.error("getAllAddressController에서 발생한 에러", err);
    next(err);
  }
};

//공지사항 입력
const insertNoticeController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { title, content } = req.body;
    const user = await getUserByIdDao(userId);
    if (!user || user.user_role_id !== 3) {
      return res.status(400).json({ message: "게시글 입력 권한이 없습니다" });
    }
    if (title.length === 0) {
      return res.status(400).json({ message: "게시글 제목이 없습니다" });
    }
    if (content.length === 0) {
      return res.status(400).json({ message: "글 내용이 없습니다" });
    }
    await insertNoticeService(title, content, userId);
    return res.status(200).json({ message: "SUCCESS" });
  } catch (err) {
    console.error("insertNoticeController에서 발생한 오류", err);
    next(err);
  }
};
//공지사항 수정
const updateNoticeController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { title, content } = req.body;
    const user = await getUserByIdDao(userId);
    if (!user || user.user_role_id !== 3) {
      return res.status(400).json({ message: "게시글 수정 권한이 없습니다" });
    }
    if (title.length === 0) {
      return res.status(400).json({ message: "게시글 제목이 없습니다" });
    }
    if (content.length === 0) {
      return res.status(400).json({ message: "글 내용이 없습니다" });
    }
    await updateNoticeService(title, content, userId);
    return res.status(200).json({ message: "SUCCESS" });
  } catch (err) {
    console.error("updateNoticeController에서 발생한 오류", err);
    next(err);
  }
};
//공지사항 상세 불러오기
const getNoticeDetailController = async (req, res, next) => {
  try {
    const postId = req.body.postId;
    if (!postId) {
      return res.status(400).json({ message: "글이 삭제 되었습니다" });
    }
    return res
      .status(200)
      .json({ message: "SUCCESS", data: await getNoticeDetailService(postId) });
  } catch (err) {
    console.error("getNoticeDetailController에서 발생한 오류", err);
    next(err);
  }
};
//공지사항 목록 불러오기
const getNoticeListController = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const pageSize = 20;
    const startItem = (page - 1) * pageSize;
    const noticeList = await getNoticeListService(startItem, pageSize);

    if (!noticeList || noticeList.length === 0) {
      return res.status(400).json({ message: "글 목록을 불어올 수 없습니다" });
    }
    return res.status(200).json({
      message: "SUCCESS",
      data: noticeList,
    });
  } catch (err) {
    console.error("getNoticeListController에서 발생한 오류", err);
    next(err);
  }
};
//공지사항 게시글 삭제
const deleteNoticeController = async (req, res, next) => {
  try {
    const postId = req.body.postId;
    const userId = 1;
    const user = await getUserByIdDao(userId);
    if (!user || user.user_role_id !== 3) {
      return res.status(400).json({ message: "게시글 삭제 권한이 없습니다" });
    }
    if (!postId) {
      return res.status(400).json({ message: "삭제할 게시글이 없습니다" });
    }
    await deleteNoticeService(postId);
    return res.status(200).json({ message: "SUCCESS" });
  } catch (err) {
    console.error("deleteNoticeController에서 발생한 오류", err);
    next(err);
  }
};

//어드민 본인이 작성한 게시글 열람
const adminGetCsDetailController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const customerServiceId = req.body.customerServiceId;
    const user = await getUserByIdDao(userId);
    if (!user || user.user_role_id !== 3) {
      return res.status(400).json({ message: "게시글 삭제 권한이 없습니다" });
    }
    if (!customerServiceId) {
      return res.status(400).json({ message: "게시글이 삭제 되었습니다" });
    }
    const csDetail = await getCsDetailService(userId, customerServiceId);

    return res.status(200).json({
      message: "SUCCESS",
      data: csDetail,
    });
  } catch (err) {
    console.error("getCsDetailController에서 발생한 에러", err);
    next(err);
    if (err.message === "게시글을 찾을 수 없습니다") {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다" });
    } else if (err.message === "게시글 열람 권한이 없습니다") {
      return res.status(403).json({ message: "게시글 열람 권한이 없습니다" });
    } else {
      return res.status(500).json({ message: "서버 오류" });
    }
  }
};
const getLetterController = async (req, res, next) => {
  try {
    await getLetterService();
  } catch (err) {
    console.error(err);
    next(err);
  }
};
const getPhotoController = async (req, res, next) => {
  try {
    await getPhotoService();
  } catch (err) {
    console.error(err);
    next(err);
  }
};
const getAddressController = async (req, res, next) => {
  try {
    await getAllAddressService();
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const adminDeleteReviewController = async (req, res, next) => {
  try {
    const reviewId = req.body.reviewId;

    await adminDeleteReviewService(reviewId);
    if (!reviewId || reviewId.length === 0) {
      return res.status(400).json({ message: "삭제할 리뷰를 선택해주세요" });
    }
    return res.status(200).json({ message: "SUCCESS" });
  } catch (err) {
    console.error("deleteReviewController에서 발생한 오류", err);
    next(err);
  }
};

const getProductReviewlistController = async (req, res, next) => {
  try {
    const data = await getProductReviewService(productId);
    const productId = req.body.productId;
    if (!productId || productId.length === 0) {
      return res.status(400).json({ message: "상품 아이디를 입력해주세요" });
    }
    return res.status(200).json({
      message: "SUCCESS",
      data: data,
    });
  } catch (err) {
    console.error("getProductReviewlistController에서 발생한 오류", err);
    next(err);
  }
};

module.exports = {
  updataProductController,
  getAllAddressController,
  insertNoticeController,
  updateNoticeController,
  getNoticeDetailController,
  getNoticeListController,
  deleteNoticeController,
  adminGetCsDetailController,
  getLetterController,
  getPhotoController,
  getAddressController,
  adminDeleteReviewController,
  getProductReviewlistController,
};

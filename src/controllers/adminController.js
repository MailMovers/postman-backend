const {
  updateProductService,
  getAllAddressService,
  insertNoticeService,
  updateNoticeService,
  getNoticeDetailService,
  getNoticeListService,
  deleteNoticeService,
} = require("../services/adminService");
const { getUserByIdDao } = require("../models/productDao");
//어드민 상품 수정
const updataProductController = async (req, res) => {
  try {
    const userId = 1;
    const { productId, name, imgUrl, padImgUrl, price, addPrice, discription } =
      req.body;
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
    if (imgUrl.length === 0) {
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
    if (discription === 0) {
      return res.status(400).json({ message: "상품설명을 입력해주세요" });
    }
    if (!productId) {
      return res.status(400).json({ message: "상품 id가 없습니다" });
    }
    await updateProductService(
      productId,
      name,
      imgUrl,
      padImgUrl,
      price,
      addPrice,
      discription
    );
    return res.status(200).json({ message: "SUCCESS" });
  } catch (err) {
    console.error("updataProductController에서 발생한 오류", err);
    throw err;
  }
};
//편지안에 주소 전부 불러오기
const getAllAddressController = async (req, res) => {
  try {
    const letterId = req.body.letterId;

    if (!letterId || letterId === 0) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    return res
      .status(200)
      .json({ message: "SUCCES", data: await getAllAddressService(letterId) });
  } catch (err) {
    console.error("getAllAddressController에서 발생한 에러", err);
    throw err;
  }
};
//공지사항 입력
const insertNoticeController = async (req, res) => {
  try {
    const userId = 1;
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
    await insertNoticeService(title, content, userId);
    return res.status(200).json({ message: "SUCCSE" });
  } catch (err) {
    console.error("insertNoticeController에서 발생한 오류", err);
    throw err;
  }
};
//공지사항 수정
const updateNoticeController = async (req, res) => {
  try {
    const userId = 1;
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
    return res.status(200).json({ message: "SUCCSE" });
  } catch (err) {
    console.error("updateNoticeController에서 발생한 오류", err);
    throw err;
  }
};
//공지사항 상세 불러오기
const getNoticeDetailController = async (req, res) => {
  try {
    const postId = req.body.postId;
    if (!postId) {
      return res.status(400).json({ message: "글이 삭제 되었습니다" });
    }
    return res
      .status(200)
      .json({ message: "SUCCSE", data: await getNoticeDetailService(postId) });
  } catch (err) {
    console.error("getNoticeDetailController에서 발생한 오류", err);
    throw err;
  }
};
//공지사항 목록 불러오기
const getNoticeListController = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = 20;
    const startItem = (page - 1) * pageSize;
    const noticeList = await getNoticeListService(startItem, pageSize);

    if (!noticeList || noticeList.length === 0) {
      return res.status(400).json({ message: "글 목록을 불어올 수 없습니다" });
    }
    return res.status(200).json({
      message: "SUCCSE",
      data: noticeList,
    });
  } catch (err) {
    console.error("getNoticeListController에서 발생한 오류", err);
    throw err;
  }
};
//공지사항 게시글 삭제
const deleteNoticeController = async (req, res) => {
  try {
    const postId = req.body.postId;
    const userId = 1;
    const user = await getUserByIdDao(userId);
    if (!user || user.user_role_id !== 3) {
      return res.status(400).json({ message: "게시글 수정 권한이 없습니다" });
    }
    if (!postId) {
      return res.status(400).json({ message: "삭제할 게시글이 없습니다" });
    }
    await deleteNoticeService(postId);
    return res.status(200).json({ message: "SUCCSE" });
  } catch (err) {
    console.error("deleteNoticeController에서 발생한 오류", err);
    throw err;
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
};
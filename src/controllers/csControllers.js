const {
  insertCsService,
  insertCsAnswerService,
  getCsDetailService,
  getCsListService,
  deleteCsService,
  adminDeleteCsService,
  adminDeleteCsAnswerService,
  getCsAnswerListService,
} = require("../services/csServices");
const { getUserByIdDao } = require("../models/productDao");

//고객센터 문의하기 (유저는 수정해야함)
const insertCsController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { title, content } = req.body;
    await insertCsService(title, content, userId);

    if (!title || title.length === 0) {
      return res.status(400).json({ messge: "글 제목을 작성해주세요" });
    }
    if (!content || content.length === 0) {
      return res.status(400).json({ messge: "글 내용을 작성해주세요" });
    }
    return res.status(200).json({
      messge: "SUCCESS",
    });
  } catch (err) {
    console.error("insertCsController에서 발생한 에러", err);
    next(err);
  }
};
//답변달기 유저는 수정해야함
const insertCsAnswerController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const customerServiceId = req.query.customerServiceId;
    const content = req.body;
    if (!userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const user = await getUserByIdDao(userId);
    await insertCsAnswerService(content, userId, customerServiceId);
    if (!user || user.user_role_id !== 3) {
      return res.status(400).json({ message: "답변 권한이 없습니다" });
    }
    if (!content || content.length === 0) {
      return res.status(400).json({ message: "답변 글을 작성해주세요" });
    }
    if (!customerServiceId) {
      return res.status(400).json({ message: "게시물이 없습니다" });
    }
    return res.status(200).json({
      message: "SUCCESS",
    });
  } catch (err) {
    console.error("insertCsAnswerController에서 생긴 에러", err);
    next(err);
  }
};

//유저 본인이 작성한 게시글 열람
const getCsDetailController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const customerServiceId = req.query.customerServiceId;
    if (!userId) {
      return res.status(400).json({ message: "게시글 열람 권한이 없습니다" });
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

//게시글 리스트 보여주기
const getCslistController = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10);
    const pageSize = 20;
    if (isNaN(page) || page <= 0) {
      return res.status(400).json({ message: "유효하지 않은 페이지 번호" });
    }
    const startItem = (page - 1) * pageSize;
    const csList = await getCsListService(startItem, pageSize);
    if (!csList || csList.length === 0) {
      return res
        .status(400)
        .json({ message: "게시글 목록을 불러올 수 없습니다" });
    }
    return res.status(200).json({ message: "SUCCESS", data: csList });
  } catch (err) {
    console.error("getCslistController에서 생긴 오류", err);
    next(err);
  }
};

//게시글 삭제하기
const deleteCsController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const customerServiceId = req.query.customerServiceId;
    await deleteCsService(userId, customerServiceId);

    if (!userId) {
      return res.status(400).json({ message: "게시글 열람 권한이 없습니다" });
    }
    if (!customerServiceId || customerServiceId.length === 0) {
      return res.status(400).json({ message: "삭제할 게시물이 없습니다" });
    }
    return res.status(200).json({
      message: "SUCCESS",
    });
  } catch (err) {
    console.error("deleteCsService에서 생긴 오류", err);
    next(err);
  }
};

//어드민 게시글 삭제하기
const adminCsDeleteController = async (req, res, next) => {
  try {
    const customerServiceId = req.query.customerServiceId;
    await adminDeleteCsService(customerServiceId);

    if (!customerServiceId || customerServiceId.length === 0) {
      return res.status(400).json({ message: "삭제할 게시물이 없습니다" });
    }
    return res.status(200).json({
      message: "SUCCESS",
    });
  } catch (err) {
    console.error("adminCsDeleteController에서 발생한 오류", err);
    next(err);
  }
};

//어드민 답변삭제
const adminDeleteCsAnswerController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const csAnswerId = req.body;
    const customerServiceId = req.query.customerServiceId;

    // 사용자 정보가 없거나 권한이 없는 경우
    const user = await getUserByIdDao(userId);
    await adminDeleteCsAnswerService(userId, csAnswerId, customerServiceId);
    if (!user || user.user_role_id !== 3) {
      return res.status(400).json({ message: "답변 권한이 없습니다" });
    }
    if (!csAnswerId) {
      return res.status(400).json({ message: "삭제할 댓글이 없습니다" });
    }
    if (!customerServiceId) {
      return res.status(400).json({ message: "게시글이 삭제되었습니다" });
    }
    return res.status(200).json({
      message: "SUCCESS",
    });
  } catch (err) {
    console.error("adminDeleteCsAnswerController에서 발생한 오류", err);
    next(err);
  }
};
//답변 목록 가져오기
const getCsAnswerListController = async (req, res, next) => {
  try {
    const customerServiceId = req.query.customerServiceId;
    if (!customerServiceId) {
      return res.status(400).json({ message: "게시글이 없습니다" });
    }
    const result = await getCsAnswerListService(customerServiceId);

    return res.status(200).json({
      message: "SUCCESS",
      data: result,
    });
  } catch (err) {
    console.error("getCsAnswerListController에서 발생한 에러", err);
    next(err);
  }
};

module.exports = {
  insertCsController,
  insertCsAnswerController,
  getCsDetailController,
  getCslistController,
  deleteCsController,
  adminCsDeleteController,
  adminDeleteCsAnswerController,
  getCsAnswerListController,
};

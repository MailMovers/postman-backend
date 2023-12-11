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
const insertCsController = async (req, res) => {
  try {
    const userId = 1;
    const { title, content } = req.body;
    await insertCsService(title, content, userId);

    if (!userId) {
      return res.status(400).json({ messge: "로그인이 필요합니다" });
    }
    if (!title || title.length === 0) {
      return res.status(400).json({ messge: "글 제목을 작성해주세요" });
    }
    if (!content || content.length === 0) {
      return res.stㄴatus(400).json({ messge: "글 내용을 작성해주세요" });
    }
    return res.status(200).json({
      messge: "게시글이 작성되었습니다",
    });
  } catch (err) {
    console.error("insertCsController에서 발생한 에러", err);
    throw err;
  }
};
//답변달기 유저는 수정해야함
const insertCsAnswerController = async (req, res) => {
  try {
    const userId = 1;
    const { content, customerServiceId } = req.body;
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
      message: "답변이 작성되었습니다",
    });
  } catch (err) {
    console.error("insertCsAnswerController에서 생긴 에러", err);
    throw err;
  }
};

//유저 본인이 작성한 게시글 열람
const getCsDetailController = async (req, res) => {
  try {
    const userId = 1;
    const customerServiceId = req.body.customerServiceId;
    if (!userId) {
      return res.status(400).json({ message: "게시글 열람 권한이 없습니다" });
    }
    if (!customerServiceId) {
      return res.status(400).json({ message: "게시글이 삭제 되었습니다" });
    }
    const csDetail = await getCsDetailService(userId, customerServiceId);

    return res.status(200).json({
      message: "게시글을 불러왔습니다",
      data: csDetail,
    });
  } catch (err) {
    console.error("getCsDetailController에서 발생한 에러", err);
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
const getCslistController = async (req, res) => {
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
    return res
      .status(200)
      .json({ message: "게시글 목록을 불러왔습니다", data: csList });
  } catch (err) {
    console.error("getCslistController에서 생긴 오류", err);
    throw err;
  }
};

//게시글 삭제하기
const deleteCsController = async (req, res) => {
  try {
    const userId = 1;
    const customerServiceId = req.body.customerServiceId;
    await deleteCsService(userId, customerServiceId);

    if (!userId) {
      return res.status(400).json({ message: "게시글 열람 권한이 없습니다" });
    }
    if (!customerServiceId || customerServiceId.length === 0) {
      return res.status(400).json({ message: "삭제할 게시물이 없습니다" });
    }
    return res.status(200).json({
      message: "게시글이 삭제되었습니다",
    });
  } catch (err) {
    console.error("deleteCsService에서 생긴 오류", err);
    throw err;
  }
};

//어드민 게시글 삭제하기
const adminCsDeleteController = async (req, res) => {
  try {
    const customerServiceId = req.body.customerServiceId;
    await adminDeleteCsService(customerServiceId);

    if (!customerServiceId || customerServiceId.length === 0) {
      return res.status(400).json({ message: "삭제할 게시물이 없습니다" });
    }
    return res.status(200).json({
      message: "게시글을 삭제했습니다",
    });
  } catch (err) {
    console.error("adminCsDeleteController에서 발생한 오류", err);
    throw err;
  }
};

//어드민 답변삭제
const adminDeleteCsAnswerController = async (req, res) => {
  try {
    const userId = 1;
    const { csAnswerId, customerServiceId } = req.body;

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
      message: "답변을 삭제하였습니다",
    });
  } catch (err) {
    console.error("adminDeleteCsAnswerController에서 발생한 오류", err);
    throw err;
  }
};
//답변 목록 가져오기
const getCsAnswerListController = async (req, res) => {
  try {
    const customerServiceId = req.body.customerServiceId;
    if (!customerServiceId) {
      return res.status(400).json({ message: "게시글이 없습니다" });
    }
    return res.status(200).json({
      message: "SUCCES",
      data: await getCsAnswerListService(customerServiceId),
    });
  } catch (err) {
    console.error("getCsAnswerListController에서 발생한 에러", err);
    throw err;
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

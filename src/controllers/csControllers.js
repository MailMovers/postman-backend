const { insertCsService } = require("../services/csServices");

const insertCsController = async (req, res) => {
  try {
    const userId = req.user.Id;
    const { title, content } = req.body;

    if (!userId) {
      return res.status(400).json({ messge: "로그인이 필요합니다" });
    }
    if (!title || title.length === 0) {
      return res.status(400).json({ messge: "글 제목을 작성해주세요" });
    }
    if (!content || content.length === 0) {
      return res.status(400).json({ messge: "글 내용을 작성해주세요" });
    }
    return res.status(200).json({
      messge: "게시글이 작성되었습니다",
      data: insertCsService(title, content, userId),
    });
  } catch (err) {
    console.error("insertCsController에서 발생한 에러", err);
    throw err;
  }
};

module.exports = { insertCsController };

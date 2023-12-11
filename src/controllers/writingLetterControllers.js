const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const getPreSignedUrl = async (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME, // S3 버킷 이름
    Key: file.originalname, // 파일 이름
    Expires: 60, // url이 만료되는 시간(초)
  };
  const preSignedUrl = await s3.getSignedUrlPromise("putObject", params); // 업로드된 파일의 URL 반환
  return preSignedUrl;
};

const {
  letterService,
  PhotoService,
  confirmLetterService,
  stampService,
  checkLetterService
} = require("../services/writingLetterServices");

// 편지쓰기 내용을 contents로 받고 contents.pageNum => 장 ,contents.content => 내용
const letterContoller = async (req, res, next) => {
  try {
    // const userId = req.query.userId; // URL의 쿼리 파라미터인 경우
    // 또는
    // const userId = req.params.userId; // URL의 경로 파라미터인 경우
    const { writingPadId, contents, userId } = req.body;
    const result = await letterService(userId, writingPadId, contents);
    return res.status(201).json({
      success: true,
      data: result,
      message: "편지저장완료",
    });
  } catch (error) {
    console.error("Error in letterController :", error);
    return {
      success: false,
      message: "Error in letterContoller. Please try again later.",
    };
  }
};
// 사용자가 작성하던 편지 확인하기
const checkLetterController = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    const result = await checkLetterService(userId);

    return res.status(201).json({
      success: true,
      message: "편지내용",
      data: result,
    });
  } catch (error) {
    console.error("error in continueLetterController", error);
    return {
      success: false,
      message: "error in continueLetterController",
    };
  }
};

const photoController = async (req, res, next) => {
  try {
    const { letterId, photoCount, s3Url } = req.body;
    const result = await PhotoService(s3Url, letterId, photoCount);
    return res.status(201).json({
      success: true,
      message: "photoController pass.",
      data: result,
    });
  } catch (error) {
    console.error("Error in photoController :", error);
    return {
      success: false,
      message: "Error in photoController. Please try again later.",
    };
  }
};

const stampController = async (req, res, next) => {
  try {
    const { stampId, letterId } = req.body;
    const result = await stampService(stampId, letterId);
    return res.status(201).json({
      success: true,
      message: "stampContoller pass.",
      data: result,
    });
  } catch (error) {
    console.error("Error in stampContoller :", error);
    return {
      success: false,
      message: "Error in stampContoller. Please try again later.",
    };
  }
};

const confirmLetterContoller = async (req, res, next) => {
  try {
    const userId = req.param.userId;
    const result = await confirmLetterService(userId);
    return res.status(201).json({
      success: true,
      message: "confirmLetterContoller pass.",
      data: result,
    });
  } catch (error) {
    console.error("Error in confirmLetterContoller :", error);
    return {
      success: false,
      message: "Error in confirmLetterContoller. Please try again later.",
    };
  }
};

module.exports = {
  letterContoller,
  photoController,
  confirmLetterContoller,
  stampController,
  getPreSignedUrl,
  checkLetterController,
};

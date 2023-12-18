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
  checkLetterService,
  checkAndInsertAddressService,
  updateLetterService,
} = require("../services/writingLetterServices");

const letterContoller = async (req, res, next) => {
  try {
    // const userId = req.query.userId; // URL의 쿼리 파라미터인 경우
    // 또는
    // const userId = req.params.userId; // URL의 경로 파라미터인 경우
    const userId = req.userId;
    const letterId = req.query.letterId;
    const { writingPadId, contents } = req.body;
    if (letterId) {
      const result = await updateLetterService(contents, letterId);
      return res.status(201).json({
        success: true,
        data: result,
        message: "편지수정완료",
      });
    } else {
      const result = await letterService(userId, writingPadId, contents);
      return res.status(201).json({
        success: true,
        data: result,
        message: "편지저장완료",
      });
    }
  } catch (error) {
    console.error("Error in letterController :", error);
    return res.status(500).json({
      success: false,
      message: "Error in letterContoller. Please try again later.",
    });
  }
};
// 사용자가 작성하던 편지 확인하기
const checkLetterController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const result = await checkLetterService(userId);
    if (result.length === 0) {
      return res.status(400).json({
        success: false,
        message: "작성하던 편지가 없습니다.",
      });
    }
    return res.status(201).json({
      success: true,
      message: "편지내용",
      data: result,
    });
  } catch (error) {
    console.error("error in continueLetterController", error);
    return res.status(500)({
      success: false,
      message: "error in continueLetterController",
    });
  }
};

const getUploadUrl = async (req, res, next) => {
  try {
    const { file } = req.body;
    const result = await getPreSignedUrl(file);
    return res.status(201).json({
      success: true,
      message: "getUploadUrl pass.",
      data: result,
    });
  } catch (error) {
    console.error("Error in getUploadUrl :", error);
    return res.status(500).json({
      success: false,
      message: "Error in getUploadUrl. Please try again later.",
    });
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
    return res.status(500).json({
      success: false,
      message: "Error in photoController. Please try again later.",
    });
  }
};

const stampController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const {
      letterId,
      deliveryAddress,
      deliveryAddressDetail,
      deliveryPhone,
      deliveryName,
      sendAddress,
      sendAddressDetail,
      sendPhone,
      sendName,
    } = req.body;
    const result = await stampService(stampId, letterId);
    const addResult = await checkAndInsertAddressService(
      userId,
      letterId,
      deliveryAddress,
      deliveryAddressDetail,
      deliveryPhone,
      deliveryName,
      sendAddress,
      sendAddressDetail,
      sendPhone,
      sendName
    );
    return res.status(201).json({
      success: true,
      message: "stampContoller pass.",
      data: result,
      data: addResult,
    });
  } catch (error) {
    console.error("Error in stampContoller :", error);
    return res.status(500).json({
      success: false,
      message: "Error in stampContoller. Please try again later.",
    });
  }
};

const confirmLetterContoller = async (req, res, next) => {
  try {
    const userId = req.userId;
    const result = await confirmLetterService(userId);
    return res.status(201).json({
      success: true,
      message: "confirmLetterContoller pass.",
      data: result,
    });
  } catch (error) {
    console.error("Error in confirmLetterContoller :", error);
    return res.status(500).json({
      success: false,
      message: "Error in confirmLetterContoller. Please try again later.",
    });
  }
};

module.exports = {
  letterContoller,
  photoController,
  confirmLetterContoller,
  stampController,
  getPreSignedUrl,
  checkLetterController,
  getUploadUrl,
};

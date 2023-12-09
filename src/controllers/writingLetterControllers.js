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
} = require("../services/writingLetterServices");

const letterContoller = async (req, res, next) => {
  try {
    const userId = req.param;
    const { writingPadId, contents } = req.body;
    const result = await letterService(userId, writingPadId, contents);
    return {
      success: true,
      message: "letterContoller pass.",
      data: result,
    };
  } catch (error) {
    console.error("Error in letterController :", error);
    return {
      success: false,
      message: "Error in letterContoller. Please try again later.",
    };
  }
};

const photoController = async (req, res, next) => {
  try {
    const { letterId, photoCount, s3Url } = req.body;
    const result = await PhotoService(s3Url, letterId, photoCount);
    return {
      success: true,
      message: "photoController pass.",
      data: result,
    };
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
    return {
      success: true,
      message: "stampContoller pass.",
      data: result,
    };
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
    return {
      success: true,
      message: "confirmLetterContoller pass.",
      data: result,
    };
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
};

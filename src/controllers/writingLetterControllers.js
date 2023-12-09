const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const uploadToS3 = async (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME, // S3 버킷 이름
    Key: file.originalname, // 파일 이름
    Body: file.buffer, // 파일 데이터
  };
  const { Location } = await s3.upload(params).promise();
  return Location; // 업로드된 파일의 URL 반환
};

const {
  letterService,
  PhotoService,
  confirmLetterService,
  stampService,
} = require("../services/writingLetterServices");

const letterContoller = async (req, res, next) => {
  try {
    const { userId, writingPadId, contents } = req.body;
    const result = await letterService(
      userId,
      writingPadId,
      contents
    );
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

const photoContoller = async (req, res, next) => {
  try {
    const { letterId, photoCount, userId } = req.body;
    const file = req.file;
    const s3Url = await uploadToS3(file);
    const result = await PhotoService(s3Url, letterId, photoCount, userId);
    return {
      success: true,
      message: "photoContoller pass.",
      data: result,
    };
  } catch (error) {
    console.error("Error in photoContoller :", error);
    return {
      success: false,
      message: "Error in photoContoller. Please try again later.",
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
  photoContoller,
  confirmLetterContoller,
  stampController,
};

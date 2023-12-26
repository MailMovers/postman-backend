const AWS = require("aws-sdk");
AWS.config.logger = console;

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const getPreSignedUrl = async (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME, // S3 버킷 이름
    Key: file.originalname, // 파일 이름
    Expires: 1520, // url이 만료되는 시간(초)
    ContentType: file.mimetype, // 파일의 MIME 타입
  };
  const preSignedUrl = await s3.getSignedUrlPromise("putObject", params); // 업로드된 파일의 URL 반환
  return preSignedUrl;
};

const {
  letterService,
  confirmLetterService,
  stampService,
  checkLetterService,
  checkAndInsertAddressService,
  updateLetterService,
  countPhotoService,
  PhotoService,
  delPhotoService,
  historyLetterService,
} = require("../services/writingLetterServices");

const letterController = async (req, res, next) => {
  try {
    const userId = req.userId;
    // const letterId = req.query.letterId;
    const { writingPadId, contents, letterId } = req.body;
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
    return res.status(400).json({
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
    return res.status(400).json({
      success: false,
      message: "error in continueLetterController",
    });
  }
};

const getUploadUrl = async (req, res, next) => {
  try {
    const { originalname } = req.file;
    const result = await getPreSignedUrl({ originalname });
    return res.status(201).json({
      success: true,
      message: "getUploadUrl pass.",
      data: result,
    });
  } catch (error) {
    console.error("Error in getUploadUrl :", error);
    return res.status(400).json({
      success: false,
      message: "Error in getUploadUrl. Please try again later.",
    });
  }
};

const photoController = async (req, res, next) => {
  try {
    const Bucket = process.env.AWS_BUCKET_NAME;
    const region = process.env.AWS_REGION;
    const { letterId, originalname } = req.body;
    const s3Url = `https://${Bucket}.s3.${region}.amazonaws.com/${originalname}`;
    const photoId = await PhotoService(s3Url, letterId);
    await countPhotoService(letterId);
    return res.status(201).json({
      success: true,
      message: "photoController pass.",
      data: photoId,
    });
  } catch (error) {
    console.error("Error in photoController :", error);
    return res.status(400).json({
      success: false,
      message: "Error in photoController. Please try again later.",
    });
  }
};

const delPhotoController = async (req, res, next) => {
  try {
    const { photoId, letterId } = req.body;
    await delPhotoService(photoId, letterId);
  } catch (error) {
    console.error("Error in delPhotoController :", error);
    return res.status(400).json({
      success: false,
      message: "Error in delPhotoController. Please try again later.",
    });
  }
};

const stampController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const {
      stampId,
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
    return res.status(400).json({
      success: false,
      message: "Error in stampContoller. Please try again later.",
    });
  }
};

const confirmLetterController = async (req, res, next) => {
  try {
    const letterId = req.query.letterId;
    const result = await confirmLetterService(letterId);
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

const historyLetterController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const result = await historyLetterService(userId);
    return res.status(201).json({
      success: true,
      message: "historyLetterContoller pass.",
      data: result,
    });
  } catch (error) {
    console.error("Error in historyLetterContoller :", error);
    return res.status(500).json({
      success: false,
      message: "Error in historyLetterContoller. Please try again later.",
    });
  }
};

module.exports = {
  letterController,
  photoController,
  confirmLetterController,
  stampController,
  getPreSignedUrl,
  checkLetterController,
  getUploadUrl,
  delPhotoController,
  historyLetterController,
};

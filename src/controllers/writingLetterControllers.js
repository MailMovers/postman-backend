const AWS = require("aws-sdk");
AWS.config.logger = console;

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const getPreSignedUrl = async (files) => {
  const urls = await Promise.all(files.map(async (file) => {
    const decodedFileName = decodeURIComponent(file.originalname);
    const fileExtension = decodedFileName.split(".").pop();
    const timestamp = Date.now();
    const newFileName = `letter/${decodedFileName}_${timestamp}.${fileExtension}`;
    const filename = `${decodedFileName}_${timestamp}.${fileExtension}`;
    const encodedNewFileName = encodeURIComponent(newFileName);
    const insertName = encodeURIComponent(filename);

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: newFileName,
      Expires: 3000,
      ContentType: file.mimetype,
    };
    const preSignedUrl = await s3.getSignedUrlPromise("putObject", params);
    return {
      preSignedUrl,
      encodedNewFileName,
      insertName,
    };
  }));
  return urls;
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
  getPhotoInfoService,
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
    const files = req.files
    const result = await getPreSignedUrl(files);
    console.log("uploadUrl", result);
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
    // insertNames를 배열로 받습니다.
    const { letterId, insertNames } = req.body;

    // 각 insertName에 대해 처리를 수행합니다.
    const photoInfos = await Promise.all(insertNames.map(async (insertName) => {
      const s3Url = `https://${Bucket}.s3.${region}.amazonaws.com/letter/${insertName}`;
      return await PhotoService(s3Url, letterId);
    }));

    // 사진 개수를 업데이트합니다.
    await countPhotoService(letterId);

    return res.status(201).json({
      success: true,
      message: "photoController pass.",
      data: photoInfos, // 여러 사진 정보를 반환합니다.
    });
  } catch (error) {
    console.error("Error in photoController :", error);
    return res.status(400).json({
      success: false,
      message: "Error in photoController. Please try again later.",
    });
  }
};

const getPhotoInfoController = async (req, res, next) => {
  try {
    const { letterId } = req.query;
    const result = await getPhotoInfoService(letterId);
    return res.status(201).json({
      success: true,
      message: "getPhotoInfoController pass.",
      data: result,
    });
  } catch (error) {
    console.error("Error in getPhotoInfoController :", error);
    return res.status(400).json({
      success: false,
      message: "Error in getPhotoInfoController. Please try again later.",
    });
  }
};

const delPhotoController = async (req, res, next) => {
  try {
    const { photoId, letterId } = req.body;
    await delPhotoService(photoId, letterId);
    return res.status(201).json({
      success: true,
      message: "delPhotoController pass.",
    });
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
    // const userId = req.userId;
    const userId = req.userId;
    const letterId = req.body.letterId;
    const result = await historyLetterService(userId, letterId);
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
  getPhotoInfoController,
};

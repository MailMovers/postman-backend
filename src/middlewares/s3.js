const AWS = require("aws-sdk");
AWS.config.logger = console;

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const PreSignedUrl = async (file, folderName) => {
  const decodedFileName = decodeURIComponent(file.originalname);
  const fileExtension = decodedFileName.split(".").pop();
  const timestamp = Date.now();
  const newFileName = `${folderName}/${decodedFileName}_${timestamp}.${fileExtension}`;
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
};

const insertS3Url = async (req, res, next) => {
    try {
      const Bucket = process.env.AWS_BUCKET_NAME;
      const region = process.env.AWS_REGION;
      const { letterId, insertName, folderName } = req.body;
  
      const s3Url = `https://${Bucket}.s3.${region}.amazonaws.com/${folderName}/${insertName}`;
  
      const photoInfo = await PhotoService(s3Url, letterId);
      await countPhotoService(letterId);
  
      return res.status(201).json({
        success: true,
        message: "photoController pass.",
        data: photoInfo,
      });
    } catch (error) {
      console.error("Error in photoController :", error);
      return res.status(400).json({
        success: false,
        message: "Error in photoController. Please try again later.",
      });
    }
  };

module.exports = { PreSignedUrl, insertS3Url};

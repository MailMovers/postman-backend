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

const insertS3Url = async (insertName, folderName) => {

      const Bucket = process.env.AWS_BUCKET_NAME;
      const region = process.env.AWS_REGION;
      const s3Url = `https://${Bucket}.s3.${region}.amazonaws.com/${folderName}/${insertName}`;
      return {
        s3Url
      }
    }

module.exports = { PreSignedUrl, insertS3Url};

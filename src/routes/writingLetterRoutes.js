const express = require("express");
const multer = require("multer");
const upload = multer();

const auth = require("../middlewares/auth.middleware");

const { writingLetterController } = require("../controllers");
const {
  letterContoller,
  photoController,
  confirmLetterContoller,
  stampController,
  checkLetterController,
  getUploadUrl,
  delPhotoController,
} = writingLetterController;

const writingLetterRoute = express.Router();

writingLetterRoute.post("/write", auth, letterContoller);
writingLetterRoute.post("/upload", auth, upload.single("file"), getUploadUrl);
writingLetterRoute.get("/check", auth, checkLetterController);
writingLetterRoute.post("/photo", auth, photoController);
writingLetterRoute.post("/delPhoto", auth, delPhotoController);
writingLetterRoute.post("/stamp", auth, stampController);
writingLetterRoute.get("/confirm", auth, confirmLetterContoller);

module.exports = { writingLetterRoute };

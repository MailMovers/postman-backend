const express = require("express");
const multer = require("multer");
const upload = multer();

const auth = require("../middlewares/auth.middleware");

const { writingLetterController } = require("../controllers");
const {
  letterController,
  photoController,
  confirmLetterController,
  stampController,
  checkLetterController,
  getUploadUrl,
  delPhotoController,
  historyLetterController,
  getPhotoInfoController,
} = writingLetterController;

const writingLetterRoute = express.Router();

writingLetterRoute.post("/write", auth, letterController);
writingLetterRoute.post("/upload", auth, upload.single("file"), getUploadUrl);
writingLetterRoute.get("/check", auth, checkLetterController);
writingLetterRoute.post("/photo", auth, photoController);
writingLetterRoute.post("/delPhoto", auth, delPhotoController);
writingLetterRoute.get("/getPhoto", auth, getPhotoInfoController);
writingLetterRoute.post("/stamp", auth, stampController);
writingLetterRoute.get("/confirm", auth, confirmLetterController);
writingLetterRoute.get("/history", auth, historyLetterController);

module.exports = { writingLetterRoute };

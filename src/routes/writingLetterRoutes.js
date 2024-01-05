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
} = writingLetterController;

const writingLetterRoute = express.Router();

writingLetterRoute.post("/write",  letterController);
writingLetterRoute.post("/upload",  upload.single("file"), getUploadUrl);
writingLetterRoute.get("/check",  checkLetterController);
writingLetterRoute.post("/photo",  photoController);
writingLetterRoute.post("/delPhoto",  delPhotoController);
writingLetterRoute.post("/stamp",  stampController);
writingLetterRoute.get("/confirm",  confirmLetterController);
writingLetterRoute.get("/history",  historyLetterController);

module.exports = { writingLetterRoute };

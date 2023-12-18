const express = require("express");
const auth = require("../middlewares/auth.middleware");

const { writingLetterController } = require("../controllers");
const {
  letterContoller,
  photoController,
  confirmLetterContoller,
  stampController,
  checkLetterController,
  getUploadUrl,
} = writingLetterController;

const writingLetterRoute = express.Router();

writingLetterRoute.post("/write", letterContoller);
writingLetterRoute.get("/photo", auth, getUploadUrl);
writingLetterRoute.get("/check", auth, checkLetterController);
writingLetterRoute.post("/photo", auth, photoController);
writingLetterRoute.post("/stamp", auth, stampController);
writingLetterRoute.get("/confirm", auth, confirmLetterContoller);

module.exports = { writingLetterRoute };

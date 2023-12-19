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

writingLetterRoute.post("/write",  letterContoller);
writingLetterRoute.get("/photo",  getUploadUrl);
writingLetterRoute.get("/check",  checkLetterController);
writingLetterRoute.post("/photo",  photoController);
writingLetterRoute.post("/stamp",  stampController);
writingLetterRoute.get("/confirm",  confirmLetterContoller);

module.exports = { writingLetterRoute };

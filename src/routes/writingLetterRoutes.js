const express = require("express");
const auth = require("../middlewares/auth.middleware");

const { writingLetterController } = require("../controllers");
const {
  letterContoller,
  photoController,
  confirmLetterContoller,
  stampController,
  checkLetterController,
} = writingLetterController;

const writingLetterRoute = express.Router();

writingLetterRoute.post("/write", letterContoller);
writingLetterRoute.get("/check",  checkLetterController);
writingLetterRoute.post("/photo", auth, photoController);
writingLetterRoute.post("/stamp",  stampController);
writingLetterRoute.get("/confirm", auth, confirmLetterContoller);

module.exports = { writingLetterRoute };

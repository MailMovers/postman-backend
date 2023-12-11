const express = require("express");

const { writingLetterController } = require("../controllers");
const {
  letterContoller,
  photoController,
  confirmLetterContoller,
  stampController,
  checkLetterController,
} = writingLetterController;

const writingLetterRoute = express.Router();

writingLetterRoute.post("/write", auth, letterContoller);
writingLetterRoute.get("/check", auth, checkLetterController);
writingLetterRoute.post("/photo", auth, photoController);
writingLetterRoute.post("/stamp", auth, stampController);
writingLetterRoute.get("/confirm", auth, confirmLetterContoller);

module.exports = { writingLetterRoute };

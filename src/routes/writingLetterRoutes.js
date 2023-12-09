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

writingLetterRoute.post("/write", letterContoller);
writingLetterRoute.get("/check", checkLetterController);
writingLetterRoute.post("/photo", photoController);
writingLetterRoute.post("/stamp", stampController);
writingLetterRoute.get("/confirm", confirmLetterContoller);

module.exports = { writingLetterRoute };

const express = require("express");

const { writingLetterController } = require("../controllers");
const {
  letterContoller,
  photoController,
  confirmLetterContoller,
  stampController,
} = writingLetterController;

const writingLetterRoute = express.Router();

writingLetterRoute.post("/write", letterContoller);
writingLetterRoute.post("/photo", photoController);
writingLetterRoute.post("/stamp", stampController);
writingLetterRoute.get("/confirm", confirmLetterContoller);

module.exports = { writingLetterRoute };

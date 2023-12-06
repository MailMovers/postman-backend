const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { writingLetterController } = require("../controllers");
const {
  letterContoller,
  photoContoller,
  confirmLetterContoller,
  stampController,
} = writingLetterController;

const writingLetterRoute = express.Router();

writingLetterRoute.post("/write", letterContoller);
writingLetterRoute.post("/photo", upload.single("file"), photoContoller);
writingLetterRoute.post("/stamp", stampController);
writingLetterRoute.get("/confirm", confirmLetterContoller);

module.exports = { writingLetterRoute };

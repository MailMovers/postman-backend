const express = require("express");
const { writingLetterController } = require("../controllers");
const {
  letterContoller,
  photoContoller,
  confirmLetterContoller,
  stampController,
  saveOrUpdateAddressController,
} = writingLetterController;

const writingLetterRoute = express.Router();

writingLetterRoute.post("/write", letterContoller);
writingLetterRoute.post("/photo", photoContoller);
writingLetterRoute.post("/stamp", stampController);
writingLetterRoute.post("/address", saveOrUpdateAddressController);
writingLetterRoute.get("/confirm", confirmLetterContoller);

module.exports = { writingLetterRoute };

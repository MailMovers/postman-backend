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
  prisonAddressesController,
  nurserySchoolAddressesController,
} = writingLetterController;

const writingLetterRoute = express.Router();

writingLetterRoute.post("/write", auth, letterController);
writingLetterRoute.post("/upload", auth, upload.array("files", 30), getUploadUrl);
writingLetterRoute.get("/check", auth, checkLetterController);
writingLetterRoute.post("/photo", auth, photoController);
writingLetterRoute.post("/delPhoto", auth, delPhotoController);
writingLetterRoute.get("/getPhoto", auth, getPhotoInfoController);
writingLetterRoute.post("/stamp", auth, stampController);
writingLetterRoute.get("/confirm", auth, confirmLetterController);
writingLetterRoute.get("/history", auth, historyLetterController);
writingLetterRoute.get('/prisons', prisonAddressesController);
writingLetterRoute.get('/nurserySchools', nurserySchoolAddressesController);

module.exports = { writingLetterRoute };

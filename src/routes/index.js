const express = require('express');
const router = express.Router();

const { addressRoute } = require('./addressRoutes');
const { writingLetterRoute } = require('./writingLetterRoutes');
const userRoute = require('./userRoutes');

router.use('/user', userRoute);
router.use('/address', addressRoute);
router.use('/letter', writingLetterRoute);

module.exports = router;

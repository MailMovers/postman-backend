const express = require('express');
const router = express.Router();

const { paymentRoute } = require('./paymentRoutes');
const { addressRoute } = require('./addressRoutes');
const { writingLetterRoute } = require('./writingLetterRoutes');
const userRoute = require('./userRoutes');

router.use('/user', userRoute);
router.use('/address', addressRoute);
router.use('/letter', writingLetterRoute);
router.use('/payments', paymentRoute);

module.exports = router;

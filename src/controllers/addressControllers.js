const {
  insertAddressService,
  insertSendAddressService,
  deleteSendAddressService,
  deleteDeliveryAddressService,
  getSendListAddressService,
  getDeliveryListAddressService,
  getSendAddressService,
  getDeliveryAddressService,
} = require("../services/addressServices");

//받는사람 주소등록 //todo 내일 리펙토링

const insertDeliveryAddressController = async (req, res, next) => {
  const userId = req.userId;
  try {
    const {
      deliveryAddress,
      deliveryAddressDetail,
      deliveryPhone,
      deliveryName,
    } = req.body;
    await insertAddressService(
      deliveryAddress,
      deliveryAddressDetail,
      deliveryPhone,
      deliveryName
    );

    if (!userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    } else if (!deliveryAddress) {
      return res.status(400).json({ message: "배송주소를 입력해주세요" });
    } else if (!deliveryAddressDetail) {
      return res.status(400).json({ message: "배송상세주소를 입력해주세요" });
    } else if (!deliveryName) {
      return res
        .status(400)
        .json({ message: "받으시는 분 성함을 입력해주세요" });
    }
    return res.status(200).json({
      message: "SUCCESS",
    });
  } catch (err) {
    console.error("insertDeliveryAddressController에서의 오류", err);
    next(err);
  }
};

//보내는사람 주소등록
const insertSendAddressController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { sendAddress, sendAddressDetail, sendPhone, sendName } = req.body;
    await insertSendAddressService(
      userId,
      sendAddress,
      sendAddressDetail,
      sendPhone,
      sendName
    );
    if (userId.length === 0 || !userId)
      return res.status(400).json({ message: "KEY_ERROR" });
    if (!sendAddress)
      return res.status(400).json({ message: "배송주소를 입력해주세요" });
    if (!sendAddressDetail)
      return res.status(400).json({ message: "배송상세주소를 입력해주세요" });
    if (!sendName)
      return res
        .status(400)
        .json({ message: "보내시는 분 성함을 입력해주세요" });
    return res.status(200).json({
      message: "SUCCESS",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
//보내는 사람 주소 삭제
const deleteSendAddressController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const sendAddressId = req.body.sendAddressId;
    await deleteSendAddressService(userId, sendAddressId);
    if (userId.length === 0 || !userId)
      return res.status(400).json({ message: "KEY_ERROR" });
    if (!sendAddressId)
      return res.status(400).json({ message: "주소가 옳바르지 않습니다" });
    return res.status(200).json({
      message: "SUCCESS",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
//받는사람 주소 삭제
const deleteDeliveryAddressController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const deliveryAddressId = req.body.deliveryAddressId;
    await deleteDeliveryAddressService(userId, deliveryAddressId);
    if (userId.length === 0 || !userId)
      return res.status(400).json({ message: "KEY_ERROR" });
    if (!deliveryAddressId)
      return res.status(400).json({ message: "주소가 옳바르지 않습니다" });
    return res.status(200).json({
      message: "SUCCESS",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
//보내는 사람 주소목록 보기
const getSendAddressListController = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (userId.length === 0 || !userId)
      return res.status(400).json({ message: "KEY_ERROR" });
    return res.status(200).json({
      message: "SUCCESS",
      data: await getSendListAddressService(userId),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
//받는사람 주소 목록보기
const getDeliveryAddressListController = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (userId.length === 0 || !userId)
      return res.status(400).json({ message: "KEY_ERROR" });
    return res.status(200).json({
      message: "SUCCESS",
      data: await getDeliveryListAddressService(userId),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
//보내는 사람 기본 배송주소
const getSendAddressController = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (userId.length === 0 || !userId)
      return res.status(400).json({ message: "KEY_ERROR" });
    return res.status(200).json({
      message: "SUCCESS",
      data: await getSendAddressService(userId),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
//받는사람 기본배송주소
const getDeliveryAddressController = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (userId.length === 0 || !userId)
      return res.status(400).json({ message: "KEY_ERROR" });
    return res.status(200).json({
      message: "SUCCESS",
      data: await getDeliveryAddressService(userId),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
module.exports = {
  insertDeliveryAddressController,
  insertSendAddressController,
  deleteSendAddressController,
  deleteDeliveryAddressController,
  getSendAddressListController,
  getDeliveryAddressListController,
  getSendAddressController,
  getDeliveryAddressController,
};

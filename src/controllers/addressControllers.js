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

//받는사람 주소등록
const insertAddressController = async (req, res, next) => {
  try {
    const {
      userId,
      deliveryAddress,
      deliveryAddressDetail,
      deliveryPhone,
      deliveryName,
    } = req.body;
    if (userId.length === 0 || !userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    } else if (!deliveryAddress) {
      return res.status(400).json({ message: "배송주소를 입력해주세요" });
    } else if (!deliveryAddressDetail) {
      return res.status(400).json({ message: "배송상세주소를 입력해주세요" });
    } else if (!deliveryName) {
      return res
        .status(400)
        .json({ message: "받으시는 분 성함을 입력해주세요" });
    } else {
      return res.status(200).json({
        message: "주소등록이 완료되었습니다",
        data: await insertAddressService(
          userId,
          deliveryAddress,
          deliveryAddressDetail,
          deliveryPhone,
          deliveryName
        ),
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};
//보내는사람 주소등록
const insertSendAddressController = async (req, res, next) => {
  try {
    const userId = 2;
    const { sendAddress, sendAddressDetail, sendPhone, sendName } = req.body;
    if (!userId) return res.status(400).json({ message: "KEY_ERROR" });
    if (!sendAddress)
      return res.status(400).json({ message: "배송주소를 입력해주세요" });
    if (!sendAddressDetail)
      return res.status(400).json({ message: "배송상세주소를 입력해주세요" });
    if (!sendName)
      return res
        .status(400)
        .json({ message: "보내시는 분 성함을 입력해주세요" });
    return res.status(200).json({
      message: "주소등록이 완료되었습니다",
      data: await insertSendAddressService(
        userId,
        sendAddress,
        sendAddressDetail,
        sendPhone,
        sendName
      ),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deleteSendAddressController = async (req, res, next) => {
  try {
    const userId = 2;
    const sendAddressId = req.body;
    if (!userId) return res.status(400).json({ message: "KEY_ERROR" });
    if (!sendAddressId)
      return res.status(400).json({ message: "주소가 옳바르지 않습니다" });
    return res.status(200).json({
      message: "주소 삭제가 완료되었습니다",
      data: await deleteSendAddressService(userId, addressId),
    });
  } catch (err) {
    console.errror(err);
    next(err);
  }
};

const deleteDeliveryAddressController = async (req, res, next) => {
  try {
    const userId = 2;
    const deliveryAddressId = req.body;
    if (!userId) return res.status(400).json({ message: "KEY_ERROR" });
    if (!deliveryAddressId)
      return res.status(400).json({ message: "주소가 옳바르지 않습니다" });
    return res.status(200).json({
      message: "주소 삭제가 완료되었습니다",
      data: await deleteDeliveryAddressService(userId, deliveryAddressId),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getSendAddressListController = async (req, res, next) => {
  try {
    const userId = 2;
    if (!userId) return res.status(400).json({ message: "KEY_ERROR" });
    return res.status(200).json({
      message: "GET_SEND_ADDRESS",
      data: await getSendListAddressService(userId),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getDeliveryAddressListController = async (req, res, next) => {
  try {
    const userId = 2;
    if (!userId) return res.status(400).json({ message: "KEY_ERROR" });
    return res.status(200).json({
      message: "GET_DELIVERY_ADDRESS",
      data: await getDeliveryListAddressService(userId),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
const getSendAddressController = async (req, res, next) => {
  try {
    const userId = 2;
    const sendAddressId = req.query;
    if (!userId) return res.status(400).json({ message: "KEY_ERROR" });
    if (!sendAddressId)
      return res.status(400).json({ message: "주소가 없습니다" });
    return res.status(200).json({
      message: "GET_SEND_ADDRESS",
      data: await getSendAddressService(userId),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getDeliveryAddressController = async (req, res, next) => {
  try {
    const userId = 2;
    const deliveryAddressId = req.body;
    if (!userId) return res.status(400).json({ message: "KEY_ERROR" });
    if (!deliveryAddressId)
      return res.status(400).json({ message: "주소가 없습니다" });
    return res.status(200).json({
      message: "GET_DELIVERY_ADDRESS",
      data: await getDeliveryAddressService(userId),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
module.exports = {
  insertAddressController,
  insertSendAddressController,
  deleteSendAddressController,
  deleteDeliveryAddressController,
  getSendAddressListController,
  getDeliveryAddressListController,
  getSendAddressController,
  getDeliveryAddressController,
};

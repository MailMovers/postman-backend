const {
  letterService,
  PhotoService,
  confirmLetterService,
  stampService,
  saveOrUpdateAddressService,
} = require("../services/writingLetterServices");

const letterContoller = async (req, res, next) => {
  try {
    const { userId, fontId, wriringPadId, content, page } = req.body;
    const result = await letterService(
      userId,
      fontId,
      wriringPadId,
      content,
      page
    );
    return {
      success: true,
      message: "letterContoller pass.",
      data: result,
    };
  } catch (error) {
    console.error("Error in letterController :", error);
    return {
      success: false,
      message: "Error in letterContoller. Please try again later.",
    };
  }
};

const photoContoller = async (req, res, next) => {
  try {
    const { imgUrl, letterId, photoCount, userId } = req.body;
    const result = await PhotoService(imgUrl, letterId, photoCount, userId);
    return {
      success: true,
      message: "photoContoller pass.",
      data: result,
    };
  } catch (error) {
    console.error("Error in photoContoller :", error);
    return {
      success: false,
      message: "Error in photoContoller. Please try again later.",
    };
  }
};

const stampController = async (req, res, next) => {
  try {
    const { stampId, letterId } = req.body;
    const result = await stampService(stampId, letterId);
    return {
      success: true,
      message: "stampContoller pass.",
      data: result,
    };
  } catch (error) {
    console.error("Error in stampContoller :", error);
    return {
      success: false,
      message: "Error in stampContoller. Please try again later.",
    };
  }
};

const saveOrUpdateAddressController = async (req, res) => {
  try {
    const { userId } = req.params;
    const addressData = req.body;
    const result = await saveOrUpdateAddressService(userId, addressData);
    return {
      success: true,
      message: "Address saved or updated successfully.",
      data: result,
    };
  } catch (error) {
    console.error("Error in saveOrUpdateAddressController :", error);
    return {
      success: false,
      message:
        "Error in saveOrUpdateAddressController. Please try again later.",
    };
  }
};

const confirmLetterContoller = async (req, res, next) => {
  try {
    const userId = req.param.userId;
    const result = await confirmLetterService(userId);
    return {
      success: true,
      message: "confirmLetterContoller pass.",
      data: result,
    };
  } catch (error) {
    console.error("Error in confirmLetterContoller :", error);
    return {
      success: false,
      message: "Error in confirmLetterContoller. Please try again later.",
    };
  }
};

module.exports = {
  letterContoller,
  photoContoller,
  confirmLetterContoller,
  stampController,
  saveOrUpdateAddressController,
};

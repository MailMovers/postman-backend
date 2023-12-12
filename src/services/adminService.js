const { upDateProductDao } = require("../models/adminDao");

const updateProductService = async (
  name,
  imgUrl,
  padImgUrl,
  price,
  addPrice,
  discription,
  productId
) => {
  return await upDateProductDao(
    name,
    imgUrl,
    padImgUrl,
    price,
    addPrice,
    discription,
    productId
  );
};

module.exports = { updateProductService };

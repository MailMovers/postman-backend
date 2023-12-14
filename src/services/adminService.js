const { upDateProductDao, getLetterAddressDao } = require("../models/adminDao");
//어드민 상품 수정
const updateProductService = async (
  productId,
  name,
  imgUrl,
  padImgUrl,
  price,
  addPrice,
  discription
) => {
  return await upDateProductDao(
    productId,
    name,
    imgUrl,
    padImgUrl,
    price,
    addPrice,
    discription
  );
};
//편지안에 주소 모두 불러오기
const getAllAddressService = async (letterId) => {
  return await getLetterAddressDao(letterId);
};

module.exports = { updateProductService, getAllAddressService };

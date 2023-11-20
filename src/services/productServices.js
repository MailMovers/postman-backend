const {
  insertProductDao,
  isRoleDoa,
  getUserByIdDao,
} = require("../models/productDao");

const insertProductService = async (
  name,
  img_url,
  price,
  add_price,
  discription
) => {
  //   const checkUser = await getUserByIdDao(userId);
  //   if (!checkUser || checkUser.length === 0) throwError(400, "NOT_USER");
  //   const checkAdmin = await isRoleDoa(userId);
  //   if (checkAdmin === "false") throwError(400, "NOT_ADDMIN");
  await insertProductDao(name, img_url, price, add_price, discription);
};

module.exports = {
  insertProductService,
};

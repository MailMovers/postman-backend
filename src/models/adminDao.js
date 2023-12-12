const { AppDataSource } = require("./dataSource");
const upDateProductDao = async (
  productId,
  name,
  imgUrl,
  padImgUrl,
  price,
  addPrice,
  discription
) => {
  try {
    const updateProduct = await AppDataSource.query(
      `
          UPDATE writing_pads 
          SET name = ?, img_url = ?, pad_img_url = ?, price = ?, add_price = ?, discription = ? 
          WHERE id = ?
        `,
      [name, imgUrl, padImgUrl, price, addPrice, discription, productId]
    );
    return updateProduct;
  } catch (error) {
    console.error("Error update product:", error);
    throw error;
  }
};

module.exports = { upDateProductDao };

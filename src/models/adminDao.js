const { AppDataSource } = require("./dataSource");
//어드민 상품수정
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

//보낸주소 받는주소 받기
const getLetterAddressDao = async (letterId) => {
  try {
    const LetterAddress = await AppDataSource.query(
      `
    SELECT
    letters.id,
    letters.user_id,
    send_address,
    send_address_detail,
    send_phone,
    send_name,
    delivery_address,
    delivery_address_detail,
    delivery_phone,
    delivery_name,
    orders.status
    FROM letters
    LEFT JOIN users ON letters.user_id = users.id
    LEFT JOIN send_address ON letters.send_address_id = send_address.id
    LEFT JOIN delivery_address ON letters.delivery_address_id = delivery_address.id
    LEFT JOIN orders ON orders.letter_id = letters.id
    WHERE orders.status = "done" AND letters.id = ?
    `,
      [letterId]
    );
    return LetterAddress;
  } catch (err) {
    console.error("getLetterAddress에서 발생한 오류", err);
    throw err;
  }
};

module.exports = { upDateProductDao, getLetterAddressDao };

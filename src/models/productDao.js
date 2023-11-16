const { AppDataSource } = require("./dataSource");

const insertProductDoa = async (name, img_url, price, add_price) => {
  const insertProduct = await AppDataSource.query(
    `
        INSERT INTO writing_ pad
        (name,img_url,price,add_price)
        VALUES
        (?,?,?,?)
        `,
    [name, img_url, price, add_price]
  );
  return insertProduct;
};

module.exports = {
  insertProductDoa,
};

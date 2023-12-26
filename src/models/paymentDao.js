const { AppDataSource } = require("./dataSource");

const getPricesDao = async (writingPadId, stampId) => {
  const writingPadPrices = await AppDataSource.query(
    `
      SELECT id, price AS writingPadPrice
      FROM writing_pads
      WHERE id IN (?)
    `,
    [writingPadId]
  );

  const stampFees = await AppDataSource.query(
    `
      SELECT id, price AS stampFee
      FROM stamps
      WHERE id IN (?)
    `,
    [stampId]
  );

  const prices = writingPadId.map((id, index) => ({
    writingPadPrice: writingPadPrices.find((price) => price.id === id)
      .writingPadPrice,
    stampFee: stampFees.find((fee) => fee.id === stampId[index]).stampFee,
  }));

  return prices;
};

const paymentInsertInfoDao = async (response, userId, letterId) => {
  const {
    orderName,
    orderId,
    paymentKey,
    method,
    totalAmount,
    vat,
    suppliedAmount,
    approvedAt,
    status,
  } = response;
  const result = await AppDataSource.query(
    `
    INSERT INTO orders (
        order_name, order_id, payment_key, method, total_amount, vat, supplied_amount, approved_at, status, user_id, letter_id
    ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    );
    `,
    [
      orderName,
      orderId,
      paymentKey,
      method,
      totalAmount,
      vat,
      suppliedAmount,
      approvedAt,
      status,
      userId,
      letterId,
    ]
  );
  return result;
};
const addPointDao = async (point, userId) => {
  const result = await AppDataSource.query(
    `
    UPDATE users
    SET point = point + ?
    WHERE id = ?
    `,
    [point, userId]
  );
  return result;
};

module.exports = { paymentInsertInfoDao, getPricesDao, addPointDao };

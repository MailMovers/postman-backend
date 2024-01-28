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

  return { writingPadPrices, stampFees };
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
        order_name, order_id, payment_key, method, total_amount, vat, supplied_amount, approved_at, status, user_id, letter_id, total_price
    ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
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
      totalAmount,
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
const getRecipe = async (letterId) => {
  const result = await AppDataSource.query(
    `
    SELECT order_name, total_amount, method FROM orders
    WHERE letter_id = ?
    `,
    [letterId]
  );
  return result;
};
const confirmPoint = async (userId) => {
  const result = await AppDataSource.query(
    `
    SELECT point FROM users
    WHERE id = ?
    `,
    [userId]
  );
  return result;
};
const recordPointTransactionDao = async (
  userId,
  pointsChange,
  transactionType,
  description
) => {
  await AppDataSource.query(
    `
    INSERT INTO point_transactions (user_id, points_change, transaction_type, description)
    VALUES (?, ?, ?, ?);
    `,
    [userId, pointsChange, transactionType, description]
  );
};

const getPaymentInfoDao = async (userId) => {
  const result = await AppDataSource.query(
    `
    SELECT order_id as orderId, product_name as productName, product_count as productCount, total_amount as totalAmount
    FROM orders 
    WHERE user_id = ?
    `,
    [userId]
  );
  return result;
};

const getOrderByIdDao = async (orderId) => {
  const result = await AppDataSource.query(
    `
    SELECT * FROM orders
    WHERE order_id = ?
    `,
    [orderId]
  );
  return result;
};

const getWritingPadNameByIdDao = async (writingPadId) => {
  const result = await AppDataSource.query(
    `
      SELECT name
      FROM writing_pads
      WHERE id = ?
    `,
    [writingPadId]
  );
  return result[0].name;
};

const getStampNameByIdDao = async (stampId) => {
  const result = await AppDataSource.query(
    `
      SELECT name
      FROM stamps
      WHERE id = ?
    `,
    [stampId]
  );
  return result[0].name;
};
const getCostomerId = async (userId) => {
  const result = await AppDataSource.query(
    `
    SELECT customer_id FROM users
    WHERE id = ?
    `,
    [userId]
  );
  return result[0].customer_id;
};

const getPointTransactionsDao = async (userId) => {
  const result = await AppDataSource.query(
    `
    SELECT * FROM point_transactions
    WHERE user_id = ?
    ORDER BY transaction_date DESC
    `,
    [userId]
  );
  return result;
};

module.exports = {
  paymentInsertInfoDao,
  getPricesDao,
  addPointDao,
  getRecipe,
  getCostomerId,
  getStampNameByIdDao,
  getWritingPadNameByIdDao,
  getOrderByIdDao,
  getPaymentInfoDao,
  recordPointTransactionDao,
  confirmPoint,
  getPointTransactionsDao,
};

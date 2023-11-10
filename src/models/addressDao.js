const { AppDataSource } = require("./dataSource");
//받는사람 주소입력
const insertAddressDao = async (
  userId,
  deliveryAddress,
  deliveryAddressDetail,
  deliveryPhone,
  deliveryName
) => {
  await AppDataSource.query(
    `
        INSERT INTO delivery_address
        (
            user_id,
            delivery_address,
            delivery_address_detail,
            delivery_phone,
            delivery_name
        )
        VALUES
        (
            ?,?,?,?,?
        )
        `,
    [
      userId,
      deliveryAddress,
      deliveryAddressDetail,
      deliveryPhone,
      deliveryName,
    ]
  );
};
const insertSendAddressDao = async (
  userId,
  sendAddress,
  sendAddressDetail,
  sendPhone,
  sendName
) => {
  await dataSource.query(
    `
          INSERT INTO send_address
          (
              user_id,
              send_address,
              send_address_detail,
              send_phone,
              send_name
          )
          VALUES
          (
              ?,?,?,?,?
          )
          `,
    [userId, sendAddress, sendAddressDetail, sendPhone, sendName]
  );
  return insertSendAddres;
};
//보낸사람 주소삭제
const deleteSendAddressDao = async (userId, sendAddressId) => {
  const deleteSendAddress = await AppDataSource.query(
    `
    UPDATE send_address
    SET deleted_at = NOW()
    WHERE user_id = ? AND id = ?;
    `,
    [userId, sendAddressId]
  );
  return deleteSendAddress;
};
//받는사람 주소 삭제
const deleteDeliveryAddressDao = async (userId, deliveryAddressId) => {
  const deleteDeliveryAddress = await AppDataSource.query(
    `
    UPDATE delivery_address
    SET deleted_at = NOW()
    WHERE user_id = ? AND id = ?;

    `,
    [userId, deliveryAddressId]
  );
  return deleteDeliveryAddress;
};

//보낸사람 주소 목록보기
const getSendListAddressDao = async (userId) => {
  const sendAddressList = await AppDataSource.query(
    `
    SELECT
    send_address_detail,
    send_address,
    send_phone,
    send_name,
    send_address.deleted_at
    FROM send_Address
    LEFT JOIN users ON users.id = send_address.user_id
    WHERE user_id = ?
    `,
    [userId]
  );
  console.log(sendAddressList);
  return sendAddressList;
};

const getDeliveryListAddressDao = async (userId) => {
  const deliveryAddressList = await AppDataSource.query(
    `
    SELECT
    delivery_address_detail,
    delivery_address,
    delivery_phone,
    delivery_name,
    delivery_address.deleted_at
    FROM delivery_address
    LEFT JOIN users ON users.id = delivery_address.user_id
    WHERE user_id  = ?
    `,
    [userId]
  );
  return deliveryAddressList;
};

const getSendAddressDao = async (userId) => {
  const sendAddressList = await AppDataSource.query(
    `
    SELECT
    send_address_detail,
    send_address,
    send_phone,
    send_name,
    send_address.deleted_at
    FROM send_address
    LEFT JOIN users ON users.id = send_address.user_id
    WHERE user_id  = ? AND send_address.deleted_at IS NULL;
    `,
    [userId]
  );
  return sendAddressList;
};

const getDeliveryAddressDao = async (userId) => {
  const deliveryAddressList = await AppDataSource.query(
    `
    SELECT
    delivery_address_detail,
    delivery_address,
    delivery_phone,
    delivery_name,
    delivery_address.deleted_at
    FROM delivery_address
    LEFT JOIN users ON users.id = delivery_address.user_id
    WHERE user_id  = ? AND delivery_address.deleted_at IS NULL;
    `,
    [userId]
  );
  return deliveryAddressList;
};

module.exports = {
  insertAddressDao,
  insertSendAddressDao,
  deleteSendAddressDao,
  deleteDeliveryAddressDao,
  getSendListAddressDao,
  getDeliveryListAddressDao,
  getSendAddressDao,
  getDeliveryAddressDao,
};

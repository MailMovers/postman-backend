const { AppDataSource } = require("./dataSource");

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
            ?,
            ?,
            ?,
            ?,
            ?
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
  await AppDataSource.query(
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
              ?,
              ?,
              ?,
              ?,
              ?
          )
          `,
    [userId, sendAddress, sendAddressDetail, sendPhone, sendName]
  );
};

const deleteSendAddressDao = async (userId, addressId) => {
  return await AppDataSource.query(
    `
    UPDATE send_address
    SET
      send_address_detail = NULL,
      send_address = NULL,
      send_phone = NULL,
      send_name = NULL
    WHERE user_id = ? AND id = ?;
    `,
    [userId],
    [addressId]
  );
};

const deleteDeliveryAddressDao = async (userId, deliveryAddressId) => {
  return await AppDataSource.query(
    `
      UPDATE delivery_address
      SET
        delivery_address_detail = NULL,
        delivery_address = NULL,
        delivery_phone = NULL,
        delivery_name = NULL
      WHERE user_id = ? AND delivery_address.id = ?;
      `,
    [userId],
    [deliveryAddressId]
  );
};

module.exports = {
  insertAddressDao,
  insertSendAddressDao,
  deleteSendAddressDao,
  deleteDeliveryAddressDao,
};

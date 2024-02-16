const { AppDataSource } = require("./dataSource");

// 1차 편지 작성 Dao
const letterDao = async (userId, writingPadId, page) => {
  try {
    const letter = await AppDataSource.query(
      `
        INSERT INTO letters (
            user_id, writing_pad_id, page
        )VALUES(
            ?,?,?
        );    
    `,
      [userId, writingPadId, page]
    );
    const id = letter.insertId;
    return { id, letter };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateLetterDao = async (page, letterId) => {
  try {
    const result = await AppDataSource.query(
      `
      UPDATE letters
      SET page = ?
      WHERE id = ?;
      `,
      [page, letterId]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const contentDao = async (letterId, pageNum, content) => {
  try {
    const result = await AppDataSource.query(
      `
        INSERT INTO content (
            letter_id, content_count, content
        ) VALUES (
            ?,?,?
        );
      `,
      [letterId, pageNum, content]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const checkLetterDao = async (userId) => {
  try {
    const result = await AppDataSource.query(
      `
      SELECT 
        letters.id as letter_id, content.content, content.content_count, letters.writing_pad_id
      FROM 
        letters 
      LEFT JOIN content ON letters.id = content.letter_id 
      LEFT JOIN orders ON letters.id = orders.letter_id 
      WHERE orders.letter_id IS NULL AND letters.user_id = ?
      `,
      [userId]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const countPhotoDao = async (letterId) => {
  try {
    const count = await AppDataSource.query(
      `
      SELECT photo_count
      FROM letters
      WHERE id = ?
      `,
      [letterId]
    );
    return count;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// 2차 사진 첨부 Dao
const photoDao = async (s3Url, letterId) => {
  try {
    const photo = await AppDataSource.query(
      `
        INSERT INTO photos (
            img_url, letter_id
        ) VALUES (
            ?, ?
        );
        `,
      [s3Url, letterId]
    );
    return photo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPhotoInfoDao = async (letterId) => {
  try {
    const photoInfo = await AppDataSource.query(
      `
      SELECT id, img_url FROM photos
      WHERE letter_id = ?;
      `,
      [letterId]
    );
    return photoInfo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const delPhotoDao = async (photoId) => {
  try {
    await AppDataSource.query(
      `
      DELETE FROM photos
      WHERE id = ?;
      `,
      [photoId]
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// 2차 사진 첨부 Dao
const updateCountPhotoDao = async (photoCount, letterId) => {
  try {
    const countPhoto = await AppDataSource.query(
      `
        UPDATE letters
        SET photo_count = ?
        WHERE id = ?;
        `,
      [photoCount, letterId]
    );
    return countPhoto;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// 3차 우표선택
const stampDao = async (stampId, letterId) => {
  try {
    const checkStamp = await AppDataSource.query(
      `
        UPDATE letters
        SET stamp_id = ?
        WHERE id = ?;
        `,
      [stampId, letterId]
    );
    return checkStamp;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const letterAddressDao = async (deliveryAddressId, sendAddressId, letterId) => {
  try {
    const result = await AppDataSource.query(
      `
      UPDATE letters
      SET delivery_address_id =?, send_address_id=?
      WHERE id =?
    `,
      [deliveryAddressId, sendAddressId, letterId]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const checkExistingSendAddressDao = async (
  userId,
  sendAddress,
  sendAddressDetail,
  sendPhone,
  sendName
) => {
  try {
    const sendExistingAddress = await AppDataSource.query(
      `
      SELECT id
      FROM send_address
      WHERE user_id = ? AND LOWER(send_address) = LOWER(?) AND send_address_detail = ? 
      AND send_phone = ? AND send_name = ? AND deleted_at IS NULL;`,
      [userId, sendAddress, sendAddressDetail, sendPhone, sendName]
    );
    return sendExistingAddress[0]?.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const checkExistingDeliveryAddressDao = async (
  userId,
  deliveryAddress,
  deliveryAddressDetail,
  deliveryPhone,
  deliveryName
) => {
  try {
    const deliveryExistingAddress = await AppDataSource.query(
      `
      SELECT id
      FROM delivery_address
      WHERE user_id = ? AND LOWER(delivery_address) = LOWER(?) AND delivery_address_detail = ? 
      AND delivery_phone = ? AND delivery_name = ? AND deleted_at IS NULL;`,
      [
        userId,
        deliveryAddress,
        deliveryAddressDetail,
        deliveryPhone,
        deliveryName,
      ]
    );
    return deliveryExistingAddress[0]?.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const getContentDao = async (letterId) => {
  try {
    const contents = await AppDataSource.query(
      `SELECT content_count as pageNum, content FROM content WHERE letter_id = ?`,
      [letterId]
    );
    return contents;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPhotosDao = async (letterId) => {
  try {
    const photos = await AppDataSource.query(
      `SELECT img_url FROM photos WHERE letter_id = ?`,
      [letterId]
    );
    return photos;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// 최종확인
const confirmLetterDao = async (letterId) => {
  try {
    const letterInfo = await AppDataSource.query(
      `
      SELECT
      letters.id,
      letters.page,
      letters.photo_count,
      writing_pads.pad_img_url AS writing_pad_img_url,
      letters.stamp_id,
      letters.writing_pad_id,
      send_address.send_address,
      send_address.send_address_detail,
      send_address.send_phone,
      send_address.send_name,
      delivery_address.delivery_address,
      delivery_address.delivery_address_detail,
      delivery_address.delivery_phone,
      delivery_address.delivery_name,
      users.point
  FROM
      letters
  LEFT JOIN writing_pads ON letters.writing_pad_id = writing_pads.id
  LEFT JOIN send_address ON letters.send_address_id = send_address.id
  LEFT JOIN delivery_address ON letters.delivery_address_id = delivery_address.id
  LEFT JOIN users ON letters.user_id = users.id
  WHERE
      letters.id = ?
  `,
      [letterId]
    );
    return letterInfo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const historyLetterDao = async (userId) => {
  try {
    const result = await AppDataSource.query(
      `
      SELECT 
          letters.id AS letterId,
          letters.status,
          writing_pads.name,
          delivery_address.delivery_address,
          delivery_address.delivery_address_detail,
          delivery_address.delivery_phone,
          delivery_address.delivery_name,
          send_address.send_address,
          send_address.send_address_detail,
          send_address.send_phone,
          send_address.send_name,
          orders.created_at AS orderCreatedAt,
          reviews.status AS reviewStatus
      FROM 
          users
      JOIN 
          letters ON users.id = letters.user_id
      JOIN 
          writing_pads ON letters.writing_pad_id = writing_pads.id
      JOIN 
          orders ON users.id = orders.user_id AND orders.status = 'DONE' AND letters.id = orders.letter_id
      LEFT JOIN 
          delivery_address ON letters.delivery_address_id = delivery_address.id
      LEFT JOIN 
          send_address ON letters.send_address_id = send_address.id
      LEFT JOIN
          reviews ON letters.id = reviews.letter_id
      WHERE 
          users.id = ?
      GROUP BY 
          letters.id, letters.status, writing_pads.name
      ORDER BY 
          orders.created_at DESC;
      `,
      [userId]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateLetterStatusDao = async (letterId) => {
  try {
    const result = await AppDataSource.query(
      `
      UPDATE letters
      SET status = '배송 준비중'
      WHERE id = ?
      `,
      [letterId]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const prisonAddress = async () => {
  try {
    const result = await AppDataSource.query(
      `
      SELECT 
        id, 
        name, 
        delivery_address, 
        delivery_address_detail, 
        post_code 
      FROM 
        prison
      `
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const nurserySchoolAddress = async () => {
  try {
    const result = await AppDataSource.query(
      `
      SELECT 
        id, 
        name, 
        delivery_address, 
        delivery_address_detail, 
        post_code 
      FROM 
        nursery_school
      `
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteSpecificContentDao = async (letterId, pageNum) => {
  try {
    const result = await AppDataSource.query(
      `
        DELETE FROM content
        WHERE letter_id = ? AND content_count = ?;
        `,
      [letterId, pageNum]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateContentDao = async (letterId, pageNum, content) => {
  try {
    const result = await AppDataSource.query(
      `
        UPDATE content
        SET content = ?
        WHERE letter_id = ? AND content_count = ?;
      `,
      [content, letterId, pageNum]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  letterDao,
  photoDao,
  countPhotoDao,
  confirmLetterDao,
  stampDao,
  contentDao,
  checkLetterDao,
  letterAddressDao,
  checkExistingSendAddressDao,
  checkExistingDeliveryAddressDao,
  updateLetterDao,
  updateCountPhotoDao,
  delPhotoDao,
  getContentDao,
  getPhotosDao,
  historyLetterDao,
  getPhotoInfoDao,
  updateLetterStatusDao,
  prisonAddress,
  nurserySchoolAddress,
  updateContentDao,
  deleteSpecificContentDao,
};

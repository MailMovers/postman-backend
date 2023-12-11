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
    const letter = await AppDataSource.query(
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
    return letter;
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

// 2차 사진 첨부 Dao
const countPhotoDao = async (photoCount, letterId) => {
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

const selectAddressDao = async () => {
  try {
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 최종확인
const confirmLetterDao = async (userId) => {
  try {
    const letterInfo = await AppDataSource.query(
      `
        SELECT
            letters.id,
            letters.page,
            letters.content,
            letters.font_file_path,
            letters.photo_count,
            photos.img_url AS photo_img_url,
            writing_pads.img_url AS writing_pad_img_url,
            letters.stamp_id,
            send_address.send_address,
            send_address.send_address_detail,
            send_address.send_phone,
            send_address.send_name,
            delivery_address.delivery_address,
            delivery_address.delivery_address_detail,
            delivery_address.delivery_phone,
            delivery_address.delivery_name
        FROM
            letters
        LEFT JOIN photos ON letters.id = photos.letter_id
        LEFT JOIN writing_pads ON letters.writing_pad_id = writing_pads.id
        LEFT JOIN send_address ON send_address.user_id = letters.user_id
        LEFT JOIN delivery_address ON delivery_address.user_id = letters.user_id
        WHERE
            letters.user_id = ?;

    `,
      [userId]
    );
    return letterInfo;
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
};

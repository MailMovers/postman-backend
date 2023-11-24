const { AppDataSource } = require("./dataSource");

// 1차 편지 작성 Dao
const letterDao = async (userId, fontId, writingPadId, content, page) => {
  try {
    const letter = await AppDataSource.query(
      `
        INSERT INTO letters (
            user_id, font_id, writing_pad_id, content, page
        )VALUES(
            ?,?,?,?,?
        );    
    `,
      [userId, fontId, writingPadId, content, page]
    );
    return letter;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 2차 사진 첨부 Dao
const photoDao = async (imgUrl, letterId) => {
  try {
    const photo = await AppDataSource.query(
      `
        INSERT INTO photos (
            img_url, letter_id
        ) VALUES (
            ?, ?
        );
        `,
      [imgUrl, letterId]
    );
    // 필요한 정보만 반환
    return photo.insertId;
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
    // 필요한 정보만 반환
    return countPhoto.affectedRows;
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
    // 필요한 정보만 반환
    return checkStamp.affectedRows;
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
};

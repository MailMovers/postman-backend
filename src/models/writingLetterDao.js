const { AppDataSource } = require("./dataSource")

// 1차 편지 작성 Dao
// gzip으로 압축해서 저장하는 방식이 서버비용에 효과적일 수 있다.
const letterDao = async (userId, fontId, writingPadId, content, page) => {
    const letter = await AppDataSource.query(`
    INSERT INTO letters (
        user_id, font_id, writing_pad_id, content, page
    )VALUES(
        ?,?,?,?,?
    );    
`, [userId, fontId, writingPadId, content, page]
    )
    return letter
}

// 2차 사진 첨부 Dao
// => 아마도 multer 사용해야할수도 있음 수정 생각해야함.
const photoDao = async (imgUrl, letterId) => {
    const photo = await AppDataSource.query(`
    INSERT INTO photos (
        img_url, letter_id
    ) VALUES (
        ?, ?
    );
    `, [imgUrl, letterId]
    )
    return photo
}

// 2차 사진 첨부 Dao
// => 첨부 된 사진 장 수
const countPhotoDao = async (photoCount, letterId) => {
    const countPhoto = await AppDataSource.query(`
    UPDATE letters
    SET photo_count = ?
    WHERE id = ?;
    `, [photoCount, letterId]
    )
    return countPhoto
}
// 주소기입은 다른 address.js파일에 있는 api를 사용
// 3차 우표선택

const stampDao = async (stampId, letterId) => {
    const checkStamp = await AppDataSource.query(`
    UPDATE letters
    SET stamp_id = ?
    WHERE id = ?;
    `, [stampId, letterId]
    )
    return checkStamp
}

// 최종확인
// gzip, Brotli 같은 압축 라이브러리를 사용해야할수도있음
// => 편지내용, 발신자내용, 수신자내용, 우표정보, 첨부사진, 수신자내용
const confirmLetterDao = async (userId) => {
    const letterInfo = await AppDataSource.query(`
    SELECT
        letters.id
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

`, [userId])
    return letterInfo
}

module.exports = { letterDao, photoDao, countPhotoDao, confirmLetterDao, stampDao }

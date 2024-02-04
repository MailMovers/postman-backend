-- migrate:up
CREATE TABLE `letter_detail` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `common` VARCHAR(255) NOT NULL,
    `envelope` VARCHAR(255) NOT NULL,
    `writing_pad_info` VARCHAR(255) NOT NULL,
    `picture` VARCHAR(255) NOT NULL,
);-- migrate:down

DROP TABLE `letter_detail`;
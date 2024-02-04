-- migrate:up
CREATE TABLE `letter_detail` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `common` VARCHAR(255) NOT NULL,
    `extra` VARCHAR(255) NOT NULL,
    `envelope` VARCHAR(255) NOT NULL,
    `writing_pad_info` VARCHAR(255) NOT NULL,
    `picture` VARCHAR(255) NOT NULL,
);
INSERT INTO `letter_detail` (`name`,`common`,`extra`,`envelope`,`writing_pad_info`,`picture`) VALUES ('letter','기본값','기본값','기본값','기본값','기본값')

-- migrate:down

DROP TABLE `letter_detail`;
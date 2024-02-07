-- migrate:up
CREATE TABLE `writing_pads` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `pad_img_url` varchar(500) NOT NULL,
  `img_url_1` varchar(500) NOT NULL,
  `img_url_2` varchar(500) NULL,
  `img_url_3` varchar(500) NULL,
  `img_url_4` varchar(500) NULL,
  `img_url_5` varchar(500) NULL,
  `description_img_url` varchar(500) NULL,
  `category` varchar(500) NOT NULL,
  `price` SMALLINT NOT NULL,
  `add_price` SMALLINT NOT NULL,
  `letter_detail_id` INT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE `writing_pads` ADD `description` VARCHAR(200) NULL;
ALTER TABLE `writing_pads` ADD `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
ALTER TABLE `writing_pads` ADD `deleted_at` TIMESTAMP NULL;
ALTER TABLE `writing_pads` ADD FOREIGN KEY (`letter_detail_id`) REFERENCES `letter_detail` (`id`);



-- migrate:down
DROP TABLE `writing_pads`

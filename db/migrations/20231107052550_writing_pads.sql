-- migrate:up
CREATE TABLE `writing_pads` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `img_url` varchar(500) NOT NULL,
  `price` SMALLINT NOT NULL,
  `add_price` SMALLINT NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE `writing_pads` ADD `discription` VARCHAR(200) NULL;
ALTER TABLE `writing_pads` ADD `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- migrate:down
DROP TABLE `writing_pads`

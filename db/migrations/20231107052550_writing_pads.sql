-- migrate:up
CREATE TABLE `writing_pads` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `img_url` varchar(500) NOT NULL,
  `price` SMALLINT NOT NULL,
  `add_price` SMALLINT NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE `posts` ADD `discription` VARCHAR(500) NULL;

-- migrate:down
DROP TABLE `writing_pads`

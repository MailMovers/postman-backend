-- migrate:up
CREATE TABLE `writing_pads` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `price` SMALLINT NOT NULL,
  `img_url` varchar(500) NOT NULL,
  `is_default` TINYINT NOT NULL DEFAULT 0,
  `name` varchar(20) NOT NULL,
  `writing_limit` INT NOT NULL DEFAULT 1000
);

-- migrate:down


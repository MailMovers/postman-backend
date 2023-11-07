-- migrate:up
CREATE TABLE `fonts` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `tag` varchar(500) NOT NULL,
  `img_url` varchar(500) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE `fonts`

-- migrate:up
CREATE TABLE `photos` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `img_url` varchar(500) NOT NULL,
  `letter_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE `photos` ADD FOREIGN KEY (`letter_id`) REFERENCES `letters` (`id`);

-- migrate:down
DROP TABLE `photos`

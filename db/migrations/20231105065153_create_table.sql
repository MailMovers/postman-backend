-- migrate:up
CREATE TABLE `photos` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `img_url` varchar(200),
  `user_id` int NOT NULL,
  `price` SMALLINT NOT NULL,
  `letter_id` int NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  FOREIGN KEY (`letter_id`) REFERENCES `letters` (`id`)
);

-- migrate:down


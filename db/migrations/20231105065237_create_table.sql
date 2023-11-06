-- migrate:up
CREATE TABLE `point_persentage` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

-- migrate:down


-- migrate:up
CREATE TABLE `reviews` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `content` text NOT NULL,
  `status` tinyint DEFAULT 1,
  `img_url` varchar(500),
  `create_at` timestamp DEFAULT (now()),
  `delete_at` timestamp,
  `letter_id` int NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  FOREIGN KEY (`letter_id`) REFERENCES `letters` (`id`)
);

-- migrate:down


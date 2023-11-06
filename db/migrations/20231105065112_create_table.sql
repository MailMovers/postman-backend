-- migrate:up
CREATE TABLE `customer_services` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `content` text NOT NULL,
  `create_at` timestamp,
  `delete_at` timestamp,
  `user_id` int NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

-- migrate:down


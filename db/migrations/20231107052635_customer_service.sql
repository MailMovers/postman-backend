-- migrate:up
CREATE TABLE `customer_service` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `content` varchar(50) NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp DEFAULT NULL
);
ALTER TABLE `customer_service` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
-- migrate:down
DROP TABLE `customer_service`

-- migrate:up
CREATE TABLE `cs_answer` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `content` varchar(500) NOT NULL,
  `user_id` int NOT NULL,
  `customer_service_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL
);
ALTER TABLE `cs_answer` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `cs_answer` ADD FOREIGN KEY (`customer_service_id`) REFERENCES `customer_service` (`id`);
-- migrate:down
DROP TABLE `cs_answer`

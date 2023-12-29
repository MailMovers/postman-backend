-- migrate:up
CREATE TABLE `send_address` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `send_address` varchar(255) NOT NULL,
  `send_address_detail` varchar(255) NOT NULL,
  `send_phone` varchar(255) NULL,
  `send_name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP
);
ALTER TABLE `send_address` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `send_address` MODIFY COLUMN `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
ALTER TABLE `send_address` MODIFY COLUMN `deleted_at` timestamp NULL;

-- migrate:down
DROP TABLE `send_address`

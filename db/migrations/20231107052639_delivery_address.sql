-- migrate:up
CREATE TABLE `delivery_address` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `delivery_address` varchar(255) NOT NULL,
  `delivery_address_detail` varchar(255) NOT NULL,
  `delivery_phone` varchar(255) NULL,
  `delivery_name` varchar(255) NOT NULL,
  `post_code` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP
);
ALTER TABLE `delivery_address` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
ALTER TABLE `delivery_address` MODIFY COLUMN `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
ALTER TABLE `delivery_address` MODIFY COLUMN `deleted_at` timestamp NULL;
-- migrate:down
DROP TABLE `delivery_address`

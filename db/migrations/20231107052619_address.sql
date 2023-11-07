-- migrate:up
CREATE TABLE `address` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `send_address` varchar(50) NOT NULL,
  `delivery_address` varchar(50) NOT NULL,
  `send_address_detail` varchar(30) NOT NULL,
  `delivery_address_detail` varchar(30) NOT NULL,
  `send_phone` varchar(20) NOT NULL,
  `delivery_phone` varchar(20) NOT NULL,
  `send_name` varchar(10) NOT NULL,
  `delivery_name` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP
);
ALTER TABLE `address` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

-- migrate:down
DROP TABLE `address`

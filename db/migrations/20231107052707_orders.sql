-- migrate:up
CREATE TABLE `orders` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `total_price` SMALLINT NOT NULL,
  `status` enum('ready_to_delivery','cancel','shipping','delivery completed') DEFAULT "ready_to_delivery",
  `payment` varchar(255) NOT NULL,
  `stamp_id` int NOT NULL,
  `user_id` int NOT NULL,
  `letter_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE `orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `orders` ADD FOREIGN KEY (`letter_id`) REFERENCES `letters` (`id`);

-- migrate:down
DROP TABLE `orders`

-- migrate:up
CREATE TABLE `orders` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `total_price` SMALLINT NOT NULL,
  `status` varchar(50) NOT NULL,
  `payment` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `letter_id` int NOT NULL,
  `order_name` varchar(400) NOT NULL,
  `order_id` varchar(500) NOT NULL,
  `payment_key` varchar(500) NOT NULL,
  `method` varchar(255) NOT NULL,
  `total_amount` int NOT NULL,
  `vat` int NOT NULL,
  `supplied_amount` int NOT NULL,
  `approved_at` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE `orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `orders` ADD FOREIGN KEY (`letter_id`) REFERENCES `letters` (`id`);

-- migrate:down
DROP TABLE `orders`

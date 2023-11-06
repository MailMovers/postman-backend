-- migrate:up
CREATE TABLE `order_detail` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `status` tinyint DEFAULT 1,
  `order_status` tinyint DEFAULT 1,
  `total_price` SMALLINT NOT NULL,
  `amount` SMALLINT,
  `payment_method` varchar(255) NOT NULL,
  `img_url` varchar(500),
  `payment_id` int NOT NULL,
  `create_at` timestamp DEFAULT (now()),
  `delete_at` timestamp,
  `users_id` int NOT NULL,
  `delivery_method_id` int NOT NULL,
  FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`),
  FOREIGN KEY (`users_id`) REFERENCES `users` (`id`),
  FOREIGN KEY (`delivery_method_id`) REFERENCES `delivery_methods` (`id`)
);

-- migrate:down


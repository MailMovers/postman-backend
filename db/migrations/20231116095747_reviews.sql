-- migrate:up
CREATE TABLE `reviews` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `user_id` int NOT NULL,
  `writing_pad_id` int NOT NULL,
  `order_id` int NOT NULL,
  `score` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp DEFAULT NULL
);
ALTER TABLE `reviews` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `reviews` ADD FOREIGN KEY (`writing_pad_id`) REFERENCES `writing_pads` (`id`);
ALTER TABLE `reviews` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);


-- migrate:down
DROP TABLE `reviews`

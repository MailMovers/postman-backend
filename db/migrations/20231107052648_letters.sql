-- migrate:up
CREATE TABLE `letters` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `page` int DEFAULT 1,
  `status` varchar(100) DEFAULT "save",
  `photo_count` int DEFAULT 0,
  `user_id` int NULL,
  `writing_pad_id` int NULL,
  `stamp_id` int NOT NULL,
  `send_address_id` int NULL,
  `delivery_address_id` int NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE `letters` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;
ALTER TABLE `letters` ADD FOREIGN KEY (`writing_pad_id`) REFERENCES `writing_pads` (`id`) ON DELETE SET NULL;
ALTER TABLE `letters` ADD FOREIGN KEY (`stamp_id`) REFERENCES `stamps` (`id`);
ALTER TABLE `letters` ADD FOREIGN KEY (`send_address_id`) REFERENCES `send_address` (`id`) ON DELETE SET NULL;
ALTER TABLE `letters` ADD FOREIGN KEY (`delivery_address_id`) REFERENCES `delivery_address` (`id`) ON DELETE SET NULL;
ALTER TABLE `letters` MODIFY `stamp_id` INT NULL;

-- migrate:down
DROP TABLE `letters`;
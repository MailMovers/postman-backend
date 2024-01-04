-- migrate:up
CREATE TABLE `letters` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `page` int DEFAULT 1,
  `status` enum('save','delete') DEFAULT "save",
  `photo_count` int DEFAULT 0,
  `user_id` int NULL,
  `writing_pad_id` int NOT NULL,
  `stamp_id` int NOT NULL,
  `send_address_id` int NOT NULL,
  `delivery_address_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE `letters` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;
ALTER TABLE `letters` ADD FOREIGN KEY (`writing_pad_id`) REFERENCES `writing_pads` (`id`);
ALTER TABLE `letters` ADD FOREIGN KEY (`stamp_id`) REFERENCES `stamps` (`id`);
ALTER TABLE `letters` ADD FOREIGN KEY (`send_address_id`) REFERENCES `send_address` (`id`);
ALTER TABLE `letters` ADD FOREIGN KEY (`delivery_address_id`) REFERENCES `delivery_address` (`id`);
ALTER TABLE `letters` MODIFY `stamp_id` INT NULL;
ALTER TABLE `letters` MODIFY `send_address_id` INT NULL;
ALTER TABLE `letters` MODIFY `delivery_address_id` INT NULL;

-- migrate:down
DROP TABLE `letters`;
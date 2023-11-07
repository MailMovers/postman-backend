-- migrate:up
CREATE TABLE `letters` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `page` int DEFAULT 1,
  `status` enum('save','delete') DEFAULT "save",
  `photo_count` int DEFAULT 0,
  `user_id` int NOT NULL,
  `writing_pad_id` int NOT NULL,
  `font_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE `letters` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `letters` ADD FOREIGN KEY (`writing_pad_id`) REFERENCES `writing_pads` (`id`);
ALTER TABLE `letters` ADD FOREIGN KEY (`font_id`) REFERENCES `fonts` (`id`);

-- migrate:down
DROP TABLE `letters`

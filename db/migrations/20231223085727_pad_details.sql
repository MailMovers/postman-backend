-- migrate:up
CREATE TABLE `pad_details` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `detail_img_url` varchar(500) NOT NULL,
  `writing_pad_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE `pad_details` ADD FOREIGN KEY (`writing_pad_id`) REFERENCES `writing_pads` (`id`);

-- migrate:down
DROP TABLE `pad_details`

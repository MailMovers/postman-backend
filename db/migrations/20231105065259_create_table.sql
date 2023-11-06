-- migrate:up
CREATE TABLE `letters` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `address` varchar(100) NOT NULL,
  `reciever_phone_number` VARCHAR(20) NOT NULL,
  `sender_phone_number` VARCHAR(20),
  `total_price` SMALLINT(10) NOT NULL,
  `status` tinyint DEFAULT 1,
  `writing_id` varchar(20) NOT NULL,
  `create_at` timestamp,
  `user_id` int NOT NULL,
  `writing_pad_id` int NOT NULL,
  FOREIGN KEY (`writing_id`) REFERENCES `writings` (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  FOREIGN KEY (`writing_pad_id`) REFERENCES `writing_pads` (`id`)
);

-- migrate:down


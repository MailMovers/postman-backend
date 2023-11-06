-- migrate:up
CREATE TABLE `address` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `delivery_address` varchar(50) NOT NULL,
  `send_address` varchar(50) NOT NULL,
  `status` tinyint DEFAULT 1,
  `delivery_phone_number` int(20) NOT NULL,
  `send_phone_number` int(20),
  `post_number` int(10)
);

-- migrate:down


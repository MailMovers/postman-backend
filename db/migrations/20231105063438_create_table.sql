-- migrate:up
CREATE TABLE `users` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `name` varchar(10),
  `email` varchar(20),
  `points` INT,
  `birthday` varchar(10),
  `gender` varchar(6),
  `phone_number` int(11),
  `status` tinyint DEFAULT 1,
  `created_at` timestamp
);

-- migrate:down


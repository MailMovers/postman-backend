-- migrate:up
CREATE TABLE `users` (
  `id` int PRIMARY KEY NOT NULL,
  `uid` int NOT NULL,
  `name` varchar(10) NULL,
  `email` varchar(20) NULL,
  `points` INT NULL,
  `birthday` varchar(10) NULL,
  `gender` varchar(6) NULL,
  `phone_number` varchar(11) NULL,
  `status` tinyint DEFAULT 1,
  `created_at` timestamp
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE `users`;
-- migrate:up
CREATE TABLE `reviews` (
  `id` int PRIMARY KEY NOT NULL,
  `user_id` int NOT NULL,
  `content` text NOT NULL,
  `status` tinyint DEFAULT 1,
  `img_url` varchar(500) NULL,
  `create_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `delete_at` timestamp,
  `letter_id` int NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE `reviews`;
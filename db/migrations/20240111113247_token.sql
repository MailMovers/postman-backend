-- migrate:up
CREATE TABLE `tokens` (
  `user_id` INT NOT NULL,
  `refresh_token` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);

-- migrate:down
DROP TABLE `tokens`;


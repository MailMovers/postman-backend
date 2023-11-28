-- migrate:up
CREATE TABLE `cs_answer` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `content` varchar(500) NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp DEFAULT NULL
);
ALTER TABLE `cs_answer` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

-- migrate:down
DROP TABLE `cs_answer`

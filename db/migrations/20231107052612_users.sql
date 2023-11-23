-- migrate:up
CREATE TABLE `users` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL ,
  `phone` varchar(255) NOT NULL,
  `role_id` int NOT NULL,
  `point` int NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP
);
ALTER TABLE `users` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
ALTER TABLE `users` MODIFY COLUMN `deleted_at` timestamp DEFAULT NULL;
ALTER TABLE `users` ADD `password` varchar(255) NOT NULL;
ALTER TABLE `users` ADD UNIQUE (`email`); -- email field is now unique

-- migrate:down
DROP TABLE `users`

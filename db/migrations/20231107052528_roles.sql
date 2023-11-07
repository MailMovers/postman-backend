-- migrate:up
CREATE TABLE `roles` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `role` enum('admin', 'print', 'user', 'cs') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE `roles`

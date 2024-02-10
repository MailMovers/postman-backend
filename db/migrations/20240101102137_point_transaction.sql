-- migrate:up
CREATE TABLE `point_transactions` (
  `transaction_id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `points_change` int NOT NULL,
  `transaction_type` varchar(20) NOT NULL,
  `transaction_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(500) NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- migrate:down
DROP TABLE `point_transactions`;


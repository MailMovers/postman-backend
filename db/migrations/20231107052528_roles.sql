CREATE TABLE `roles` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `role` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO `roles` (`role`) VALUES ('user'), ('admin');

-- migrate:down
DROP TABLE `roles`
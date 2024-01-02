-- migrate:up
CREATE TABLE `user_deletion_reasons` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `reason` text NULL
);
-- migrate:down
DROP TABLE `user_deletion_reasons`;

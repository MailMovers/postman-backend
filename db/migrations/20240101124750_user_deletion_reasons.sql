-- migrate:up
CREATE TABLE `user_deletion_reasons` (
  `reason` text NULL
);
-- migrate:down
DROP TABLE `user_deletion_reasons`;

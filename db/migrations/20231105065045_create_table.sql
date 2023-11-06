-- migrate:up
CREATE TABLE `letter_status` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `status` VARCHAR
);

-- migrate:down


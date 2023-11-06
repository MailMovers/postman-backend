-- migrate:up
CREATE TABLE `letter_types` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `additional_price` decimal NOT NULL DEFAULT 0
);

-- migrate:down


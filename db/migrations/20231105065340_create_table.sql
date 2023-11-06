-- migrate:up
CREATE TABLE `payment_method` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL
);

-- migrate:down


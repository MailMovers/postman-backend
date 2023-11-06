-- migrate:up
CREATE TABLE `orders` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `letter_id` int NOT NULL,
  FOREIGN KEY (`letter_id`) REFERENCES `letters` (`id`)
);

-- migrate:down


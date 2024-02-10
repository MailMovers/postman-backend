-- migrate:up
CREATE TABLE `stamps` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `price` SMALLINT NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO `stamps` (`name`, `price`) VALUES 
('common', 1500), 
('registered', 3500), 
('semi-registered', 3000), 
('express', 4000);
-- migrate:down
DROP TABLE `stamps`

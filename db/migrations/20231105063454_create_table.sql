-- migrate:up
CREATE TABLE `writings` (
  `id` int NOT NULL DEFAULT 1,
  `name` varchar(30) NOT NULL,
  `size` int(5) NOT NULL
);

-- migrate:down


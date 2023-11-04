-- migrate:up
CREATE TABLE ``(
  `id` int PRIMARY KEY NOT NULL
  `status` VARCHAR(10)
)NGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down


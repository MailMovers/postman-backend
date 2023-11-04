-- migrate:up
CREATE TABLE writings (
  id INT DEFAULT 1 NOT NULL,
  name VARCHAR(30) NOT NULL,
  size INT(5) NOT NULL
)NGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE writings;

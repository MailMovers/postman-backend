-- migrate:up
CREATE TABLE magazine (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  price SMALLINT NOT NULL,
  name VARCHAR(30) NOT NULL
)NGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down

DROP TABLE magazine
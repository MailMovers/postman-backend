-- migrate:up
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  letter_id INT NOT NULL,
  FOREIGN KEY (letter_id) REFERENCES letters(id)
)NGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down

DROP TABLE orders
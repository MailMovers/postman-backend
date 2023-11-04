-- migrate:up
CREATE TABLE letter_detail (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  text TEXT NOT NULL,
  page INT DEFAULT 1 NOT NULL,
  letter_id INT NOT NULL,
  letter_types_id INT NOT NULL,
  image_url VARCHAR(255),
  FOREIGN KEY (letter_id) REFERENCES letters(id),
  FOREIGN KEY (letter_types_id) REFERENCES letter_types(id)
)NGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down

DROP TABLE letter_detail
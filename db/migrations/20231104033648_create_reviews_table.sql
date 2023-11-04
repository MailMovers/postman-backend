-- migrate:up
CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  status TINYINT DEFAULT 1,
  img_url VARCHAR(500),
  create_at TIMESTAMP DEFAULT NOW(),
  delete_at TIMESTAMP,
  letter_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (letter_id) REFERENCES letters(id)
)NGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- migrate:down
DROP TABLE reviews;

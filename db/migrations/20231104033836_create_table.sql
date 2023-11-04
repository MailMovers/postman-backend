-- migrate:up
CREATE TABLE customer_services (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  title VARCHAR(20) NOT NULL,
  content TEXT NOT NULL,
  create_at TIMESTAMP,
  delete_at TIMESTAMP,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
)NGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- migrate:down

DROP TABLE customer_services
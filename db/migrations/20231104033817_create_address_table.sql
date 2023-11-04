-- migrate:up
CREATE TABLE address (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  delivery_address VARCHAR(50) NOT NULL,
  send_address VARCHAR(50) NOT NULL,
  status TINYINT DEFAULT 1,
  delivery_phone_number INT(20) NOT NULL,
  send_phone_number INT(20),
  post_number INT(10),
  FOREIGN KEY (user_id) REFERENCES users(id)
)NGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE address;

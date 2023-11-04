-- migrate:up
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  uid INT NOT NULL,
  name VARCHAR(10),
  email VARCHAR(20),
  points INT,
  birthday VARCHAR(10),
  gender VARCHAR(6),
  phone_number INT(11),
  status TINYINT DEFAULT 1,
  created_at TIMESTAMP
)NGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE users;
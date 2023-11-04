-- migrate:up
CREATE TABLE letter_status (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  status VARCHAR(255)
)NGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- migrate:down
DROP TABLE letter_status

-- migrate:up
CREATE TABLE payment_method (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name VARCHAR(20) NOT NULL
)NGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE payment_method;

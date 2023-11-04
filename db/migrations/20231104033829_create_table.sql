-- migrate:up
CREATE TABLE order_detail (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  status TINYINT DEFAULT 1,
  order_status TINYINT DEFAULT 1,
  total_price SMALLINT NOT NULL,
  amount SMALLINT,
  payment_method VARCHAR(255) NOT NULL,
  img_url VARCHAR(500),
  payment_id INT NOT NULL,
  create_at TIMESTAMP DEFAULT NOW(),
  delete_at TIMESTAMP,
  users_id INT NOT NULL,
  delivery_method_id INT NOT NULL,
  FOREIGN KEY (payment_id) REFERENCES payments(id),
  FOREIGN KEY (users_id) REFERENCES users(id),
  FOREIGN KEY (delivery_method_id) REFERENCES delivery_methods(id)
)NGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE order_detail

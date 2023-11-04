-- migrate:up
CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  order_id INT NOT NULL,
  payment_method_id INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (payment_method_id) REFERENCES payment_method(id)
);

-- migrate:down
DROP TABLE payments;

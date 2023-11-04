-- migrate:up
CREATE TABLE payment_method (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name VARCHAR(20) NOT NULL
);

-- migrate:down
DROP TABLE payment_method;

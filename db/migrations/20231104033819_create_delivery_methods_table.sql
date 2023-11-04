-- migrate:up
CREATE TABLE delivery_methods (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  price SMALLINT NOT NULL,
  description VARCHAR(255)
);

-- migrate:down
DROP TABLE delivery_methods;

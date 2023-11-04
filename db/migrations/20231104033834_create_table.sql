-- migrate:up
CREATE TABLE letter_types (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  additional_price DECIMAL NOT NULL DEFAULT 0
);

-- migrate:down

DROP TABLE letter_detail
-- migrate:up
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  letter_id INT NOT NULL,
  FOREIGN KEY (letter_id) REFERENCES letters(id)
);

-- migrate:down

DROP TABLE orders
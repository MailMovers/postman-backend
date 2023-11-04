-- migrate:up
CREATE TABLE photos (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  img_url VARCHAR(200),
  user_id INT NOT NULL,
  price SMALLINT NOT NULL,
  letter_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (letter_id) REFERENCES letters(id)
);

-- migrate:down
DROP TABLE photos;

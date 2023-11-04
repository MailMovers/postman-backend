-- migrate:up
CREATE TABLE point_persentage (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- migrate:down

DROP TABLE point_persentage
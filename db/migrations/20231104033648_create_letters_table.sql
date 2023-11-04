-- migrate:up
CREATE TABLE letters (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  address VARCHAR(100) NOT NULL,
  reciever_phone_number VARCHAR(20) NOT NULL,
  sender_phone_number VARCHAR(20),
  total_price SMALLINT(10) NOT NULL,
  status TINYINT DEFAULT 1,
  writing_id VARCHAR(20) NOT NULL,
  user_id INT NOT NULL,
  writing_pad_id INT NOT NULL,
  create_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (writing_pad_id) REFERENCES writing_pads(id)
);
-- migrate:down
DROP TABLE letters;

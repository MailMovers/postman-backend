-- migrate:up
CREATE TABLE letter_status (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  status VARCHAR(255)
);


-- migrate:down
DROP TABLE letter_status

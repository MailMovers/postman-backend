-- migrate:up
CREATE TABLE magazine (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  price SMALLINT NOT NULL,
  name VARCHAR(30) NOT NULL
);

-- migrate:down

DROP TABLE magazine
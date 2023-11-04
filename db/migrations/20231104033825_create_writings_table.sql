-- migrate:up
CREATE TABLE writings (
  id INT DEFAULT 1 NOT NULL,
  name VARCHAR(30) NOT NULL,
  size INT(5) NOT NULL
);

-- migrate:down
DROP TABLE writings;

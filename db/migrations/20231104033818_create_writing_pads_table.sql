-- migrate:up
CREATE TABLE writing_pads (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  price SMALLINT NOT NULL,
  img_url VARCHAR(500) NOT NULL,
  is_default TINYINT NOT NULL DEFAULT 0,
  name VARCHAR(20) NOT NULL,
  writing_limit INT NOT NULL DEFAULT 1000
)NGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE writing_pads;

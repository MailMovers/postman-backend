-- migrate:up
CREATE TABLE `email_auth` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) NOT NULL,
    `auth_number` INT NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- migrate:down

DROP TABLE IF EXISTS `email_auth`;
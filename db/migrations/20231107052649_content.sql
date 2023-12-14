-- migrate:up
CREATE TABLE `content` (
    `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `letter_id` int NOT NULL,
    `content` text NOT NULL,
    `content_count` int NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
ALTER TABLE `content` ADD FOREIGN KEY (`letter_id`) REFERENCES `letters` (`id`);

-- migrate:down
DROP TABLE `content`;
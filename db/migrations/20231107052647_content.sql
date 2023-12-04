-- migrate:up
CREATE TABLE `content` (
    `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `content` text NOT NULL,
    `content_count` int DEFAULT 1,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE `content`;

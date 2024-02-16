-- migrate:up
CREATE TABLE `nursery_school` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `delivery_address` varchar(255) NOT NULL,
  `delivery_address_detail` varchar(255) NOT NULL,
  `post_code` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE `nursery_school`

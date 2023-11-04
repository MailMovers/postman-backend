-- migrate:up
CREATE TABLE ``(
  `id` int PRIMARY KEY NOT NULL
  `user_id` int FOREIGN KEY NOT NULL
  `delivery_address` varchar(50) NOT NULL
  `send_address` varchar(50) NOT NULL
  `status` tinyint DEFAULT: 1
  `delivery_phone_number` int(20) NOT NULL
  `send_phone_number` int(20) NOT NULL
  `post_number` int(10) NOT NULL
)NGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down


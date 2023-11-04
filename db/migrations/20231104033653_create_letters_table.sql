-- migrate:up
CREATE TABLE ``(
  `id` int PRIMARY KEY NOT NULL
  `address` varchar(100) NOT NULL
  `reciever_phone_number` VARCHAR(20) NOT NULL
  `sender_phone_number` VARCHAR(20) NULL
  `total_price` SMALLINT(10) NOT NULL
  `status` tinyint DEFAULT: 1
  `writing_id` int FOREIGN KEY NOT NULL
  `create_at` timestamp
  `user_id` int FOREIGN KEY NOT NULL
  `writing_pad_id` int FOREIGN KEY NOT NULL
)NGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down


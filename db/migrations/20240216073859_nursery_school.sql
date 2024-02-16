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

INSERT INTO `nursery_school` 
(`name`, `delivery_address`, `delivery_address_detail`, `post_code`)
 VALUES
('강남드림빌', '서울특별시 강남구 양재대로 344-27', '02-573-0412', ''),
('강동꿈마을', '서울특별시 강동구 천호대로 186길 21', '02-478-3290', ''),
('구세군서울후생원', '서울특별시 서대문구 독립문로 8길 41', '02-372-7937', ''),
('남산원', '서울특별시 중구 소파로 2길 31', '02-752-9836', ''),
('돈보스코 오라토리오', '서울특별시 영등포구 여의대방로 65', '02-828-3507', ''),
('돈보스코자립생활관', '서울특별시 영등포 여의대방로 65', '02-845-0985', ''),
('동명아동복지센터', '서울특별시 관악구 봉천로 23라길 15 A동', '02-877-1846~7', ''),
('마자렐로센터', '서울특별시 영등포구 신길로 93', '02-832-5796', ''),
('명진들꽃사랑마을', '서울특별시 강동구 구천면로 68나길 10-1', '02-478-2939', ''),
('살레시오청소년센터', '서울특별시 영등포구 디지털로 424', '02-832-5026', ''),
('삼동보이스타운', '서울특별시 마포구 가양대로 124', '02-372-7534', ''),
('상록보육원', '서울특별시 관악구 남현길 63', '02-584-7097', ''),
('서부아동복지센터', '서울특별시 은평구 백련산로 14길 20-11', '02-351-2340', ''),
('서울성로원', '서울특별시 동작구 만양로 60', '02-813-0070', ''),
('서울특별시꿈나무마을 연두꿈터', '서울특별시 은평구 백련산로 14길 20-11', '02-351-2260', ''),
('서울특별시꿈나무마을 초록꿈터', '서울특별시 은평구 백련산로 14길 20-11', '02-351-2100', ''),
('서울특별시꿈나무마을 파란꿈터', '서울특별시 은평구 백련산로 14길 20-11', '02-351-2002', ''),
('서울SOS어린이마을', '서울특별시 양천구 가로공원로 58길 46', '02-2692-0253', ''),
('선덕원', '서울특별시 종로구 세검정로7가길 15-1', '02-359-4282', ''),
('성모자애드림힐', '서울특별시 노원구 덕릉로 70가길 45', '02-937-6900', ''),
('성애원', '경기도 이천시 구만리로 314', '031-635-6203', ''),
('송죽원', '서울특별시 서대문구 송죽길 23', '02-391-3385', ''),
('시온원', '서울특별시 동작구 상도로 39길 48', '02-815-8582', ''),
('에델마을', '서울특별시 구로구 천왕로 47', '02-2688-6109', ''),
('영락보린원', '서울특별시 용산구 후암로4길 70', '02-778-8533', ''),
('오류마을', '서울특별시 구로구 오류로 8길 84', '02-2612-6534', ''),
('은평천사원', '서울특별시 은평구 갈현로 11길 30', '02-355-1701', ''),
('이든아이빌', '서울특별시 성동구 왕십리로21 라길11', '02-2292-0421', ''),
('지온보육원', '서울특별시 강서구 금낭화로26가길 120', '02-2662-3457', ''),
('청운보육원', '서울특별시 동작구 국사봉1길 145', '02-823-3363', ''),
('혜명보육원', '서울특별시 금천구 탑골로 35', '02-802-0358', ''),
('혜심원', '서울특별시 용산구 소월로 2나길 18', '02-755-8459', '');
-- migrate:down
DROP TABLE `nursery_school`

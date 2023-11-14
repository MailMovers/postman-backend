// tests/user.test.js

// npm i --save-dev supertest
const request = require("supertest");

// supertest의 request에 app을 담아 활용하기 위해 createApp 함수를 불러옵니다.
const { createApp } = require("../app");
// DB와의 커넥션을 위해 DataSource 객체를 불러옵니다.
const { AppDataSource } = require("../src/models/dataSource");
const exp = require("constants");

describe("CREATE DELIVERY ADDRESS", () => {
  let app;
  beforeAll(async () => {
    // 모든 테스트가 시작하기 전(beforeAll)에 app을 만들고, DataSource를 이니셜라이징 합니다.
    app = createApp();
    await AppDataSource.initialize();

    // 새로운 사용자 추가
    await AppDataSource.query(`
      INSERT INTO users (id, name, email, phone, role_id)
      VALUES (1, '김동언', 'kimdongeun@gmail.com', '000-0000-00000', 3)
    `);

    // Delivery Address 테이블 초기화
    await AppDataSource.query(`
      INSERT INTO delivery_address
      (user_id, delivery_address, delivery_address_detail, delivery_phone, delivery_name)
      VALUES (1, '서울특별시 강남구 대치동111-11', '101동 501호', '010-0000-0000', '김아무개')
    `);

    await AppDataSource.query(`
      INSERT INTO delivery_address
      (user_id, delivery_address, delivery_address_detail, delivery_phone, delivery_name)
      VALUES (1, '경기 광주시 초월읍', '30-8', '010-0000-0000', '박아무개')
    `);
  });
  afterAll(async () => {
    await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 0;`);
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.query(`TRUNCATE delivery_address`);
    await AppDataSource.query(`TRUNCATE send_address`);
    await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 1;`);

    await AppDataSource.destroy();
  });

  test("SUCCESS: invalid address", async () => {
    // supertest의 request를 활용하여 app에 테스트용 request를 보냅니다.
    await request(app)
      .post("/address/delivery") // HTTP Method, 엔드포인트 주소를 작성합니다.
      .send({
        userId: "1",
        deliveryAddress: "서울특별시 강남구",
        deliveryAddressDetail: "선릉로 위코드",
        deliveryPhone: "010-0000-0000",
        deliveryName: "김아무게",
      }) // body를 작성합니다.
      .expect(200); // expect()로 예상되는 statusCode, response를 넣어 테스트할 수 있습니다.
    expect({ message: "주소등록이 완료되었습니다" });
  });

  test("SUCCESS: invalid address", async () => {
    // supertest의 request를 활용하여 app에 테스트용 request를 보냅니다.
    await request(app)
      .post("/address/delivery") // HTTP Method, 엔드포인트 주소를 작성합니다.
      .send({
        userId: "1",
        deliveryAddress: "경기 광주시 초월읍",
        deliveryAddressDetail: "30-8",
        deliveryPhone: "010-0000-0000",
        deliveryName: "박아무개",
      }) // body를 작성합니다.
      .expect(200); // expect()로 예상되는 statusCode, response를 넣어 테스트할 수 있습니다.
    expect({ message: "주소등록이 완료되었습니다" });
  });

  test("FAILED: insert address", async () => {
    // supertest의 request를 활용하여 app에 테스트용 request를 보냅니다.
    await request(app)
      .post("/address/delivery") // HTTP Method, 엔드포인트 주소를 작성합니다.
      .send({
        userId: "1",
        deliveryAddress: "서울특별시 동작구 사당동",
        delieveryAddressDetail: "",
        deliveryPhone: "null",
        deliveryName: "김동언",
      }) // body를 작성합니다.
      .expect(400) // expect()로 예상되는 statusCode, response를 넣어 테스트할 수 있습니다.
      .expect({ message: "배송상세주소를 입력해주세요" });
  });

  test("SUCCESS, get delivery address", async () => {
    const res = await request(app)
      .get("/address/delivery")
      .send({ userId: "1" });
    expect(200);
    expect({ message: "GET_DELIVERY_ADDRESS" });

    expect({
      data: [
        {
          delivery_address_detail: "101동 501호",
          delivery_address: "서울특별시 강남구 대치동111-11",
          delivery_phone: "010-0000-0000",
          delivery_name: "김아무개",
          deleted_at: null,
        },
        {
          delivery_address_detail: "30-8",
          delivery_address: "경기 광주시 초월읍",
          delivery_phone: "010-0000-0000",
          delivery_name: "박아무개",
          deleted_at: null,
        },
      ],
    });
  });
  test("FAILED:, get delivery address", async () => {
    const res = await request(app)
      .get("/address/delivery")
      .send({ userId: 111 });
    expect(400);
    expect({ message: "KEY_ERROR" });
  });

  test("SUCCESS,get default address", async () => {
    const res = await request(app)
      .get("/address/default/delivery")
      .send({ userId: 1 });
    expect(200);
    expect({ message: "GET_DELIVERY_ADDRESS" });
    expect({
      data: [
        {
          delivery_address_detail: "101동 501호",
          delivery_address: "서울특별시 강남구 대치동111-11",
          delivery_phone: "010-0000-0000",
          delivery_name: "김아무개",
          deleted_at: null,
        },
      ],
    });
  });
  test("FAILED:,get default address", async () => {
    const res = await request(app)
      .get("/address/default/delivery")
      .send({ userId: 111 });
    expect(400);
    expect({ message: "KEY_ERROR" });
  });

  test("SUCCESS:,delete delivery address", async () => {
    const res = await request(app)
      .post("/address/delete/delivery")
      .send({ userId: 1 })
      .send({ deliveryAddressId: 1 });
    expect(200);
    expect({ message: "주소 삭제가 완료되었습니다" });
    expect({
      data: {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        serverStatus: 2,
        warningCount: 0,
        message: "(Rows matched: 1  Changed: 1  Warnings: 0",
        protocol41: true,
        changedRows: 1,
      },
    });
  });

  test("SUCCESS:,delete delivery address", async () => {
    const res = await request(app)
      .post("/address/delete/delivery")
      .send({ userId: 1111 })
      .send({ deliveryAddressId: 1 });
    expect(400);
    expect({ message: "KEY_ERROR" });
  });
});

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

    await AppDataSource.query(`
    INSERT INTO roles (id, role)
    VALUES (1,"user")`);

    await AppDataSource.query(`
    INSERT INTO roles (id, role)
    VALUES (2,"print")`);

    await AppDataSource.query(`
    INSERT INTO roles (id, role)
    VALUES (3,"admin")`);

    await AppDataSource.query(`
INSERT INTO users (id, name, email, phone, role_id, password)
VALUES (1,"김동언","email@email.com","010-0000-0000", 3, "0000")
`);

    await AppDataSource.query(`
INSERT INTO writing_pads(name, img_url, price, add_price, discription)
VALUES ("이쁜편지지","이미지유알엘","2500","1800","알아서 잘고르세여")`);

    await AppDataSource.query(`
INSERT INTO writing_pads(name, img_url, price, add_price, discription)
VALUES ("이쁜편지지1","이미지유알엘1","250","180","알아서 잘고르세")`);

    await AppDataSource.query(`
INSERT INTO stamps (id, name, price, description)
VALUES (1,"일반우표","2500","일반우표입니당")
`);

    await AppDataSource.query(`
INSERT INTO fonts (id,name,tag, img_url, file_path)
VALUES (1,"이쁜폰트",1,"이미지유알엘","뭔지모름")
`);

    await AppDataSource.query(`
INSERT INTO send_address
(user_id, send_address, send_address_detail, send_phone, send_name)
VALUES (1, '서울특별시 111-11', '111동 111호', '010-0000-0000', '김아무개')
`);

    await AppDataSource.query(`
INSERT INTO delivery_address
(user_id, delivery_address, delivery_address_detail, delivery_phone, delivery_name)
VALUES (1, '경기 광주시 초월읍', '30-8', '010-0000-0000', '박아무개')
`);

    await AppDataSource.query(`
INSERT INTO letters (id, content, page, status, photo_count, user_id, writing_pad_id, font_id, stamp_id, send_address_id, delivery_address_id)
VALUES (1,"편지내용일겁니다", 3, "save", 1, 1, 1, 1, 1, 1, 1)
`);

    await AppDataSource.query(`
    INSERT INTO orders (id, total_price, status, payment, user_id, letter_id, order_name, order_id, payment_key, method, total_amount, vat, supplied_amount, approved_at)
    VALUES (1, 5000, "delivery completed", "카드결제", 1, 1, "주문번호", 1, 1, 5000, 1, 1, 1, '2016-11-15');
 `);
  });

  afterAll(async () => {
    await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 0;`);
    await AppDataSource.query(`TRUNCATE users`);
    await AppDataSource.query(`TRUNCATE roles`);
    await AppDataSource.query(`TRUNCATE writing_pads`);
    await AppDataSource.query(`TRUNCATE fonts`);
    await AppDataSource.query(`TRUNCATE stamps`);
    await AppDataSource.query(`TRUNCATE letters`);
    await AppDataSource.query(`TRUNCATE orders`);
    await AppDataSource.query(`TRUNCATE send_address`);
    await AppDataSource.query(`TRUNCATE delivery_address`);
    await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 1;`);

    await AppDataSource.destroy();
  });
  test("SUCCESS: INSERT PRODUCT", async () => {
    // supertest의 request를 활용하여 app에 테스트용 request를 보냅니다.
    await request(app)
      .post("/product/") // HTTP Method, 엔드포인트 주소를 작성합니다.
      .send({
        userId: "1",
        name: "이쁜편지지",
        img_url: "이미지유알엘",
        price: "2500",
        add_price: "1800",
        discription: "알아서 잘고르세여",
      }); // body를 작성합니다.
    expect(200); // expect()로 예상되는 statusCode, response를 넣어 테스트할 수 있습니다.
    expect({ message: "리뷰가 작성되었습니다" });
  });

  test("FAILED: INSERT PRODUCT ", async () => {
    await request(app).post("/product/").send({
      userId: "2",
      name: "안이쁜편지지",
      img_url: "사진일겁니다",
      price: "500",
      add_price: "150",
      discription: "이거 고르지 마세요",
    });
    expect(400);
    expect({ message: "게시글 작성 권한이 없습니다" });
  });

  test("SUCCESS: GET PRODUCT LIST", async () => {
    await request(app).get("/product/");
    expect(200);
    expect({
      message: "상품 목록을 불러왔습니다",
      data: [
        {
          name: "이쁜편지지",
          img_url: "이미지유알엘",
          price: 2500,
          add_price: 1800,
          discription: "알아서 잘고르세여",
        },
        {
          name: "이쁜편지지1",
          img_url: "이미지유알엘1",
          price: 250,
          add_price: 180,
          discription: "알아서 잘고르세",
        },
      ],
    });
  });

  //아이디어가 안떠오름 뭐로 에러를 터트려야 할지 모르갰음
  //   test("FAILED: GET PRODUCT LIST", async () => {
  //     await request(app).get("/product/")

  //     expect(400);
  //     expect({ message: "상품 목록을 불러올 수 없습니다" });
  //   });

  test("SUCCESS: INSERT REVIEW", async () => {
    await request(app).post("/product/1").send({
      userId: 1,
      productId: 1, // productId 값을 적절한 값으로 변경하세요.
    });

    // 테스트가 성공했는지에 대한 기대값 설정
    const response = await request(app).get("/some-endpoint"); // 실제 테스트에서는 어떤 엔드포인트에서 데이터를 반환하는지 확인해야 합니다.
    expect(200);
    expect({
      message: "리뷰가 작성되었습니다",
      data: {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 1,
        serverStatus: 2,
        warningCount: 0,
        message: "",
        protocol41: true,
        changedRows: 0,
      },
    });
  });

  test("FAILED: INSERT PRODUCT ", async () => {
    await request(app).post("/product/1").send({
      userId: "3",
    });
    expect(400);
    expect({ message: "게시글 작성 권한이 없습니다" });
  });

  test("FAILED: INSERT PRODUCT ", async () => {
    await request(app).post("/product/1").send({
      userId: "2",
    });
    expect(400);
    expect({ message: "상품이름을 작성해주세요" });
  });

  test("FAILED: INSERT PRODUCT ", async () => {
    await request(app).post("/product/1").send({
      userId: "2",
      name: "아쁜편지지",
    });
    expect(400);
    expect({ message: "상품이름을 작성해주세요" });
  });

  test("FAILED: INSERT PRODUCT ", async () => {
    await request(app).post("/product/1").send({
      userId: "2",
      name: "아쁜편지지",
      img_url: "이미지유알엘",
    });
    expect(400);
    expect({ message: "상품이미지를 넣어주세요" });
  });

  test("FAILED: INSERT PRODUCT ", async () => {
    await request(app).post("/product/1").send({
      userId: "2",
      name: "아쁜편지지",
      img_url: "이미지유알엘",
      price: "2500",
    });
    expect(400);
    expect({ message: "가격을 작성해주세요" });
  });

  test("FAILED: INSERT PRODUCT ", async () => {
    await request(app).post("/product/1").send({
      userId: "2",
      name: "아쁜편지지",
      img_url: "이미지유알엘",
      price: "2500",
      discription: "",
    });
    expect(400);
    expect({ message: "가격을 작성해주세요" });
  });
});

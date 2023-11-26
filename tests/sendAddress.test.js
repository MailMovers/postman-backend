// tests/user.test.js

// // npm i --save-dev supertest
// const request = require("supertest");

// // supertest의 request에 app을 담아 활용하기 위해 createApp 함수를 불러옵니다.
// const { createApp } = require("../app");
// // DB와의 커넥션을 위해 DataSource 객체를 불러옵니다.
// const { AppDataSource } = require("../src/models/dataSource");
// const exp = require("constants");

// describe("CREATE send ADDRESS", () => {
//   let app;
//   beforeAll(async () => {
//     // 모든 테스트가 시작하기 전(beforeAll)에 app을 만들고, DataSource를 이니셜라이징 합니다.
//     app = createApp();
//     await AppDataSource.initialize();

//     await AppDataSource.query(`
//     INSERT INTO roles (id, role)
//     VALUES (1,"user")`);

//     await AppDataSource.query(`
//     INSERT INTO roles (id, role)
//     VALUES (2,"print")`);

//     await AppDataSource.query(`
//     INSERT INTO roles (id, role)
//     VALUES (3,"admin")`);

//     // 새로운 사용자 추가
//     await AppDataSource.query(`
//       INSERT INTO users (id, name, email, phone, role_id, password)
//       VALUES (2, '김동언', 'kimdongeun@gmail.com', '000-0000-00000', 3, "0000")
//     `);

//     await AppDataSource.query(`
//     INSERT INTO users (id, name, email, phone, role_id, password)
//     VALUES (3, '이재훈', 'dlwogns@gmail.com', '000-0000-00000', 3, "0000")
//   `);
//     await AppDataSource.query(`
//   INSERT INTO send_address
//   (user_id, send_address, send_address_detail, send_phone, send_name)
//   VALUES (2, '서울특별시 111-11', '111동 111호', '010-0000-0000', '김아무개')
// `);
//     await AppDataSource.query(`
//     INSERT INTO send_address
//     (user_id, send_address, send_address_detail, send_phone, send_name)
//     VALUES (2, '서울특별시 111-11', '111동 111호', '010-0000-0000', '김아무개')
//   `);
//   });
//   afterAll(async () => {
//     await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 0;`);
//     await AppDataSource.query(`TRUNCATE users`);
//     await AppDataSource.query(`TRUNCATE send_address`);
//     await AppDataSource.query(`TRUNCATE roles`);
//     await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 1;`);

//     await AppDataSource.destroy();
//   });

//   test("SUCCESS: invalid address", async () => {
//     // supertest의 request를 활용하여 app에 테스트용 request를 보냅니다.
//     await request(app)
//       .post("/address/send") // HTTP Method, 엔드포인트 주소를 작성합니다.
//       .send({
//         userId: "2",
//         sendAddress: "서울특별시특별시 111-11",
//         sendAddressDetail: "111동111호",
//         sendPhone: "010-0000-0000",
//         sendName: "김아무게",
//       }); // body를 작성합니다.
//     expect(200); // expect()로 예상되는 statusCode, response를 넣어 테스트할 수 있습니다.
//     expect({ message: "주소등록이 완료되었습니다" });
//   });

//   test("SUCCESS: invalid address", async () => {
//     // supertest의 request를 활용하여 app에 테스트용 request를 보냅니다.
//     await request(app)
//       .post("/address/send") // HTTP Method, 엔드포인트 주소를 작성합니다.
//       .send({
//         userId: "2",
//         sendAddress: "서울특별시특별시 111-11",
//         sendAddressDetail: "111동111호",
//         sendPhone: "010-0000-0000",
//         sendName: "김아무게",
//       }); // body를 작성합니다.
//     expect(200); // expect()로 예상되는 statusCode, response를 넣어 테스트할 수 있습니다.
//     expect({ message: "주소등록이 완료되었습니다" });
//   });

//   test("FAILED: invalid address", async () => {
//     // supertest의 request를 활용하여 app에 테스트용 request를 보냅니다.
//     await request(app)
//       .post("/address/send") // HTTP Method, 엔드포인트 주소를 작성합니다.
//       .send({
//         userId: "4",
//         sendAddress: "서울특별시 강남구",
//         sendAddressDetail: "선릉로 위코드",
//         sendPhone: "010-0000-0000",
//         sendName: "김아무게",
//       }); // body를 작성합니다.
//     expect(400); // expect()로 예상되는 statusCode, response를 넣어 테스트할 수 있습니다.
//     expect({ message: "KEY ERROR" });
//   });

//   test("SUCCESS, get send address", async () => {
//     const res = await request(app).get("/address/send").send({ userId: "1" });
//     expect(200);
//     expect({ message: "GET_SEND_ADDRESS" });

//     expect({
//       data: [
//         {
//           sendAddressDetail: "111동111호",
//           sendAddress: "서울특별시특별시 111-11",
//           sendPhone: "010-0000-0000",
//           sendName: "김아무게",
//           deleted_at: null,
//         },
//         {
//           sendAddressDetail: "111동111호",
//           sendAddress: "서울특별시특별시 111-11",
//           sendPhone: "010-0000-0000",
//           sendName: "김아무게",
//           deleted_at: null,
//         },
//       ],
//     });
//   });
//   test("FAILED: invalid address", async () => {
//     // supertest의 request를 활용하여 app에 테스트용 request를 보냅니다.
//     await request(app)
//       .get("/address/send") // HTTP Method, 엔드포인트 주소를 작성합니다.
//       .send({
//         userId: "4",
//         sendAddress: "서울특별시 강남구",
//         sendAddressDetail: "선릉로 위코드",
//         sendPhone: "010-0000-0000",
//         sendName: "김아무게",
//       }); // body를 작성합니다.
//     expect(400); // expect()로 예상되는 statusCode, response를 넣어 테스트할 수 있습니다.
//     expect({ message: "KEY ERROR" });
//   });
//   test("SUCCESS,get default address", async () => {
//     const res = await request(app)
//       .get("/address/default/send")
//       .send({ userId: 2 });
//     expect(200);
//     expect({ message: "GET_SEND_ADDRESS" });
//     expect({
//       data: [
//         {
//           sendAddressDetail: "111동111호",
//           sendAddress: "서울특별시특별시 111-11",
//           sendPhone: "010-0000-0000",
//           sendName: "김아무게",
//           deleted_at: null,
//         },
//       ],
//     });
//   });
//   test("FAILED:,get default address", async () => {
//     const res = await request(app)
//       .get("/address/default/send")
//       .send({ userId: 111 });
//     expect(400);
//     expect({ message: "KEY_ERROR" });
//   });

//   test("SUCCESS:,delete send address", async () => {
//     const res = await request(app)
//       .post("/address/delete/send")
//       .send({ userId: 2 })
//       .send({ deliveryAddressId: 1 });
//     expect(200);
//     expect({ message: "주소 삭제가 완료되었습니다" });
//     expect({
//       data: {
//         fieldCount: 0,
//         affectedRows: 1,
//         insertId: 0,
//         serverStatus: 2,
//         warningCount: 0,
//         message: "(Rows matched: 1  Changed: 1  Warnings: 0",
//         protocol41: true,
//         changedRows: 1,
//       },
//     });
//   });
//   test("SUCCESS:,delete send address", async () => {
//     const res = await request(app)
//       .post("/address/delete/delivery")
//       .send({ userId: 1111 })
//       .send({ deliveryAddressId: 1 });
//     expect(400);
//     expect({ message: "KEY_ERROR" });
//   });
// });

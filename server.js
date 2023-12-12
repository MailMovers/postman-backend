require("dotenv").config();

const { createApp } = require("./app");
const { AppDataSource } = require("./src/models/dataSource");

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.SERVER_PORT;

  await AppDataSource.initialize();

  app.listen(PORT, '0.0.0.0',() => {
    console.log(`Listening on Port ${PORT}`);
  });
};

startServer();

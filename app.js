const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { errorHandler } = require("./src/utils/errorHandler");
const router = require("./src/routes");


const createApp = () => {
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.use(express.json());
  app.use(cors());
  app.use(morgan("dev"));

  app.use(router);
  app.use(errorHandler);

  return app;
};

module.exports = { createApp };

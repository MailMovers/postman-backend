const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const passportConfig = require('./src/passport');

const { errorHandler } = require('./src/utils/errorHandler');
const router = require('./src/routes');

const createApp = () => {
    const app = express();

    app.get('/', (req, res) => {
        res.send('Hello World - Github Actions!');
    });

    app.use(express.json());
    app.use(cors());
    app.use(morgan('dev'));
    app.use(cookieParser());

    passportConfig(app);
    app.use(router);
    app.use(errorHandler);

    return app;
};

module.exports = { createApp };

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const passportConfig = require('./src/passport');

const { errorHandler } = require('./src/utils/errorHandler');
const router = require('./src/routes');

// cron scheduling
const cron = require('./src/cron');

// cors whitelist
const whitelist = [
    'http://localhost:3000',
    'https://postman-frontend-beige.vercel.app',
    'https://port-0-mailtree-frontend-199u12dls5r68ip.sel5.cloudtype.app',
    'https://port-0-mail-movers-admin-vercel-199u12dls5r68ip.sel5.cloudtype.app',
];

const createApp = () => {
    const app = express();

    app.get('/', (req, res) => {
        res.send('MAILTREE - RELEASE GITHUB ACTIONS22!');
    });

    app.use(
        cors({
            origin: whitelist,
            credentials: true,
        })
    );
    app.use(cookieParser());
    app.use(express.json());
    app.use(morgan('dev'));

    passportConfig(app);
    app.use(router);
    app.use(errorHandler);

    return app;
};

module.exports = { createApp };

const redis = require('redis');

const redisClient = redis.createClient({
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
    legacyMode: true,
});

redisClient.on('connect', () => {
    console.info('Redis Connected!');
});

redisClient.on('error', (error) => {
    console.error('Redis Client Error', error);
});

redisClient.connect();

const redisCli = redisClient.v4;

module.exports = redisCli;

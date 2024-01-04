const cron = require('node-cron');

const { deleteUser } = require('./user-delete.cron');

// 탈퇴한 매달 25일 주기로 데이터 삭제
cron.schedule('0 0 25 * *', deleteUser);

module.exports = cron;

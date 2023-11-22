const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserDao } = require('../models');

class UserService {
    userDao = new UserDao();

    signUp = async ({ name, email, phone, password }) => {
        try {
            // 비밀번호 암호화
            const hashedPassword = await bcrypt.hashSync(password, 10);

            return await this.userDao.insertUser({ name, email, phone, hashedPassword });
        } catch (error) {
            throw error;
        }
    };
}

module.exports = UserService;

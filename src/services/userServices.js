const bcrypt = require('bcrypt');
const { UserDao } = require('../models');
const { ErrorNames, CustomError } = require('../utils/customErrors');

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

    sendEmail = async ({ email }) => {
        try {
            // 이메일 중복검사
            const isEmailExist = await this.userDao.checkDuplicatedEmail({ email });

            if (isEmailExist.length > 0) {
                throw new CustomError(ErrorNames.EmailExistError, '이미 가입된 이메일입니다.');
            }
        } catch (error) {
            throw error;
        }
    };
}

module.exports = UserService;

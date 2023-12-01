const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserDao } = require('../models');
const { ErrorNames, CustomError } = require('../utils/customErrors');
const smtpTransport = require('../config/email.config');

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
            const isEmailExist = await this.userDao.findUserByEmail({ email });

            if (isEmailExist.length > 0) {
                throw new CustomError(ErrorNames.EmailExistError, '이미 가입된 이메일입니다.');
            }

            // 인증번호 생성
            const authNumber = Math.floor(Math.random() * 888888) + 111111;
            console.log(authNumber);
            // 인증번호 암호화
            const hashedAuthNumber = await bcrypt.hashSync(authNumber.toString(), 10);

            const mailOptions = {
                from: process.env.NODEMAILER_USER, // 발신자 이메일 주소
                to: email,
                subject: '[MailMovers] 인증 관련 메일입니다.',
                html: `<h1>아래 인증번호를 확인하여 이메일 인증을 완료해주세요.</h1><br>
                <p>인증번호 ${authNumber}</p>`,
            };

            smtpTransport.sendMail(mailOptions, async (error, response) => {
                if (error) {
                    smtpTransport.close();
                    throw error;
                } else {
                    smtpTransport.close();
                }
            });
            return { hashedAuthNumber };
        } catch (error) {
            throw error;
        }
    };

    verifyAuthNumber = async ({ authNumber, HAN }) => {
        try {
            // 입력받은 인증번호와 암호화된 인증번호를 비교
            const isVerified = await bcrypt.compareSync(authNumber, HAN);

            if (!isVerified) {
                throw new CustomError(
                    ErrorNames.AuthNumberFailedVerifyError,
                    '인증번호가 일치하지 않습니다.'
                );
            }
        } catch (error) {
            throw error;
        }
    };

    kakaoSignUp = async ({ name, email, phone_number }) => {
        try {
            const [user] = await this.userDao.findUserByEmail({ email });

            if (!user) {
                // 회원가입
                const phone = await this.kakaoPhoneFormatting({ phone_number });

                // 비밀번호 암호화
                const hashedPassword = await bcrypt.hashSync('a12345678', 10);

                const { insertId } = await this.userDao.insertUser({
                    name,
                    email,
                    phone,
                    hashedPassword,
                });

                return { userId: insertId };
            }

            return { userId: user.id };
        } catch (error) {
            throw error;
        }
    };

    kakaoPhoneFormatting = async ({ phone_number }) => {
        // +82, 10-0000-0000
        const [internationalNumber, phone] = phone_number.split(' ');

        return '0' + phone.split('-').join('');
    };

    generateAccessToken = async ({ userId }) => {
        try {
            return jwt.sign(
                {
                    userId,
                },
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: '10s',
                }
            );
        } catch (error) {
            throw error;
        }
    };

    generateRefreshToken = async () => {
        try {
            return jwt.sign({}, process.env.JWT_SECRET_KEY, {
                expiresIn: '1d',
            });
        } catch (error) {
            throw error;
        }
    };
}

module.exports = UserService;

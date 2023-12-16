const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserDao } = require('../models');
const { ErrorNames, CustomError } = require('../utils/customErrors');
const smtpTransport = require('../config/email.config');
const redisCli = require('../config/redis.config');

const SOCIAL_PASSWORD = 'a12345678';

class UserService {
    userDao = new UserDao();

    signUp = async ({ name, email, phone, password }) => {
        try {
            // 비밀번호 암호화
            const hashedPassword = await bcrypt.hashSync(password, 10);

            const provider = 'local';

            return await this.userDao.insertUser({ name, email, phone, hashedPassword, provider });
        } catch (error) {
            throw error;
        }
    };

    sendEmail = async ({ email }) => {
        try {
            // 이메일 중복검사
            const isEmailExist = await this.userDao.findUserByEmail({ email, provider: 'local' });

            if (isEmailExist.length > 0) {
                throw new CustomError(ErrorNames.EmailExistError, '이미 가입된 이메일입니다.');
            }

            // 인증번호 생성
            const authNumber = Math.floor(Math.random() * 888888) + 111111;

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

    signIn = async ({ email, password }) => {
        try {
            const [user] = await this.userDao.findUserByEmail({ email, provider: 'local' });

            if (!user) {
                throw new CustomError(
                    ErrorNames.UserNotFoundError,
                    '이메일 또는 비밀번호를 다시 확인해주세요.'
                );
            }

            const isMatched = await bcrypt.compareSync(password, user.password);

            if (!isMatched) {
                throw new CustomError(
                    ErrorNames.PasswordNotMatchedError,
                    '이메일 또는 비밀번호를 다시 확인해주세요.'
                );
            }

            return { userId: user.id };
        } catch (error) {
            throw error;
        }
    };

    kakaoSignUp = async ({ name, email, phone_number }) => {
        try {
            const [user] = await this.userDao.findUserByEmail({ email, provider: 'kakao' });

            if (!user) {
                // 회원가입
                const phone = await this.kakaoPhoneFormatting({ phone_number });

                // 비밀번호 암호화
                const hashedPassword = await bcrypt.hashSync(SOCIAL_PASSWORD, 10);

                const provider = 'kakao';

                const { insertId } = await this.userDao.insertUser({
                    name,
                    email,
                    phone,
                    hashedPassword,
                    provider,
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

    naverSignUp = async ({ email, mobile, name }) => {
        try {
            const [user] = await this.userDao.findUserByEmail({ email, provider: 'naver' });

            if (!user) {
                const phone = mobile.split('-').join(''); // 01000000000

                const hashedPassword = await bcrypt.hashSync(SOCIAL_PASSWORD, 10);

                const provider = 'naver';

                const { insertId } = await this.userDao.insertUser({
                    name,
                    email,
                    phone,
                    hashedPassword,
                    provider,
                });

                return { userId: insertId };
            }

            return { userId: user.id };
        } catch (error) {
            throw error;
        }
    };

    // Access Token 생성
    generateAccessToken = async ({ userId }) => {
        try {
            return jwt.sign(
                {
                    userId,
                },
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: '1d',
                }
            );
        } catch (error) {
            throw error;
        }
    };

    // Refresh Token 생성
    generateRefreshToken = async () => {
        try {
            return jwt.sign({}, process.env.JWT_SECRET_KEY, {
                expiresIn: '14d',
            });
        } catch (error) {
            throw error;
        }
    };

    // Access Token 검증
    verifyAccessToken = async ({ accessToken }) => {
        try {
            return jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        } catch (error) {
            // jwt expired
            if (error.name === 'TokenExpiredError') {
                return null;
            }
            throw error;
        }
    };

    // Refresh Token 검증
    verifyRefreshToken = async ({ refreshToken, userId }) => {
        try {
            // Redis에 저장된 Refresh Token 가져오기
            const redisRefreshToken = await this.getRefreshTokenInRedis({ userId });

            // 두 Refresh Token이 일치하는지 판별
            if (refreshToken !== redisRefreshToken) {
                throw new CustomError(ErrorNames.RefreshTokenNotMatchedError, '잘못된 토큰입니다.');
            }

            return jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
        } catch (error) {
            // jwt expired
            if (error.name === 'TokenExpiredError') {
                return null;
            }
            throw error;
        }
    };

    // Refresh Token을 Redis에 저장
    setRefreshTokenInRedis = async ({ userId, refreshToken }) => {
        try {
            await redisCli.SET(`refresh-${userId}`, refreshToken, {
                EX: 60 * 60 * 24,
            });
        } catch (error) {
            throw error;
        }
    };

    // Refresh Token을 Redis에서 가져오기
    getRefreshTokenInRedis = async ({ userId }) => {
        try {
            return await redisCli.GET(`refresh-${userId}`);
        } catch (error) {
            throw error;
        }
    };
}

module.exports = UserService;

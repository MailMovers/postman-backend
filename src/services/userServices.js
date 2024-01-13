const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserDao } = require('../models');
const { ErrorNames, CustomError } = require('../utils/customErrors');
const smtpTransport = require('../config/email.config');
const { v4: uuidv4 } = require('uuid');

const SOCIAL_PASSWORD = 'a12345678';

class UserService {
    userDao = new UserDao();

    signUp = async ({ name, email, phone, password }) => {
        try {
            // 비밀번호 암호화
            const hashedPassword = await bcrypt.hashSync(password, 10);

            // 회원 UUID
            const customerId = uuidv4();

            const provider = 'local';

            return await this.userDao.insertUser({
                name,
                email,
                phone,
                hashedPassword,
                provider,
                customerId,
            });
        } catch (error) {
            throw error;
        }
    };

    sendEmail = async ({ email }) => {
        try {
            // 이메일 중복검사
            const [user] = await this.userDao.getUserInfoByEmail({
                email,
                provider: 'local',
            });

            if (user) {
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
            const [user] = await this.userDao.getUserInfoByEmail({ email, provider: 'local' });

            if (!user) {
                throw new CustomError(
                    ErrorNames.UserNotFoundError,
                    '이메일 또는 비밀번호를 다시 확인해주세요.'
                );
            }

            // 회원 탈퇴한 유저 체크
            if (user.deleted_at) {
                throw new CustomError(ErrorNames.WithdrawUserError, '이미 탈퇴한 회원입니다.');
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
            const [user] = await this.userDao.getUserInfoByEmail({ email, provider: 'kakao' });

            if (!user) {
                // 비밀번호 암호화
                const hashedPassword = await bcrypt.hashSync(SOCIAL_PASSWORD, 10);
                const provider = 'kakao';

                // 회원 UUID
                const customerId = uuidv4();

                const { insertId } = await this.userDao.insertUser({
                    name,
                    email,
                    phone: phone_number,
                    hashedPassword,
                    provider,
                    customerId,
                });

                return { userId: insertId };
            }

            // 회원 탈퇴한 유저 체크
            if (user.deleted_at) {
                throw new CustomError(ErrorNames.WithdrawUserError, '이미 탈퇴한 회원입니다.');
            }

            return { userId: user.id };
        } catch (error) {
            throw error;
        }
    };

    naverSignUp = async ({ email, mobile, name }) => {
        try {
            const [user] = await this.userDao.getUserInfoByEmail({ email, provider: 'naver' });

            if (!user) {
                const hashedPassword = await bcrypt.hashSync(SOCIAL_PASSWORD, 10);
                const provider = 'naver';

                // 회원 UUID
                const customerId = uuidv4();

                const { insertId } = await this.userDao.insertUser({
                    name,
                    email,
                    phone: mobile,
                    hashedPassword,
                    provider,
                    customerId,
                });

                return { userId: insertId };
            }

            // 회원 탈퇴한 유저 체크
            if (user.deleted_at) {
                throw new CustomError(ErrorNames.WithdrawUserError, '이미 탈퇴한 회원입니다.');
            }

            return { userId: user.id };
        } catch (error) {
            throw error;
        }
    };

    googleLogin = async ({ name, email }) => {
        try {
            const [user] = await this.userDao.getUserInfoByEmail({ email, provider: 'google' });

            if (!user) {
                const hashedPassword = await bcrypt.hashSync(SOCIAL_PASSWORD, 10);
                const provider = 'google';

                // 회원 UUID
                const customerId = uuidv4();

                const { insertId } = await this.userDao.insertUser({
                    name,
                    email,
                    phone: null,
                    hashedPassword,
                    provider,
                    customerId,
                });

                return { userId: insertId };
            }

            // 회원 탈퇴한 유저 체크
            if (user.deleted_at) {
                throw new CustomError(ErrorNames.WithdrawUserError, '이미 탈퇴한 회원입니다.');
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
            // DB에 저장된 Refresh Token 가져오기
            const [token] = await this.userDao.getRefreshToken({ userId });

            // 두 Refresh Token이 일치하는지 판별
            if (refreshToken !== token.refresh_token) {
                throw new CustomError(ErrorNames.RefreshTokenNotMatchedError, '잘못된 토큰입니다.');
            }

            return jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
        } catch (error) {
            // refresh token 에서 오류가 나면 db에서 삭제
            await this.userDao.deleteRefreshToken({ userId });
            // jwt expired
            if (error.name === 'TokenExpiredError') {
                return null;
            }
            throw error;
        }
    };

    // Refresh Token을 DB에 저장
    setRefreshTokenInDB = async ({ userId, refreshToken }) => {
        try {
            // 이미 회원의 Refresh Token 이 존재하는지
            const [token] = await this.userDao.getRefreshToken({ userId });

            if (!token) {
                // 존재하지 않는다면
                return await this.userDao.setRefreshToken({ userId, refreshToken });
            }

            // 존재한다면
            return await this.userDao.updateRefreshToken({ userId, refreshToken });
        } catch (error) {
            throw error;
        }
    };

    getUserInfo = async ({ userId }) => {
        try {
            const [userInfo] = await this.userDao.getUserInfoByUserId({ userId });

            return userInfo;
        } catch (error) {
            throw error;
        }
    };

    updatePassword = async ({ userId, password, newPassword }) => {
        try {
            console.log(userId, password, newPassword);

            const [user] = await this.userDao.getPasswordByUserId({ userId });

            const isVerified = await bcrypt.compareSync(password, user.password);

            if (!isVerified) {
                throw new CustomError(
                    ErrorNames.PasswordNotMatchedError,
                    '비밀번호가 일치하지 않습니다.'
                );
            }

            const hashedNewPassword = await bcrypt.hashSync(newPassword, 10);

            return await this.userDao.updateUserPassword({ userId, hashedNewPassword });
        } catch (error) {
            throw error;
        }
    };

    updatePhone = async ({ userId, newPhone }) => {
        try {
            const [user] = await this.userDao.getPhoneByUserId({ userId });

            // 기존 휴대폰번호와 새로 입력받은 휴대폰 번호가 같을 경우
            if (user.phone === newPhone) {
                throw new CustomError(
                    ErrorNames.PhoneNumberError,
                    '휴대폰번호를 다시 확인해주세요.'
                );
            }

            return await this.userDao.updateUserPhone({ userId, newPhone });
        } catch (error) {
            throw error;
        }
    };

    withdrawal = async ({ userId, password, reason }) => {
        try {
            const [user] = await this.userDao.getPasswordByUserId({ userId });

            const isVerified = await bcrypt.compareSync(password, user.password);

            if (!isVerified) {
                throw new CustomError(
                    ErrorNames.PasswordNotMatchedError,
                    '비밀번호가 일치하지 않습니다.'
                );
            }

            await this.userDao.withdrawal({ userId, reason });
        } catch (error) {
            throw error;
        }
    };
}

module.exports = UserService;

const {
    signUpSchema,
    emailAuthSchema,
    authNumberSchema,
    signInSchema,
    updatePasswordSchema,
    updatePhoneSchema,
    withdrawalSchema,
} = require('../utils/validation');
const { UserService } = require('../services');
const { ErrorNames, CustomError } = require('../utils/customErrors');
const jwt = require('jsonwebtoken');
const url = require('url');

class UserController {
    userService = new UserService();

    // 회원가입
    signUp = async (req, res, next) => {
        try {
            const { name, email, phone, password } = await signUpSchema.validateAsync(req.body);

            await this.userService.signUp({ name, email, phone, password });

            return res.status(201).json({ success: true, message: '회원가입에 성공했습니다.' });
        } catch (error) {
            // Joi
            if (error.isJoi) {
                const { message } = error.details[0];
                return res.status(400).json({ success: false, message });
            }
            return res.status(400).json({ success: false, message: '회원가입에 실패하였습니다.' });
        }
    };

    // 이메일 인증
    emailAuth = async (req, res, next) => {
        try {
            const { email } = await emailAuthSchema.validateAsync(req.body);

            await this.userService.sendEmail({ email });

            return res.status(200).json({ success: true, message: '인증번호를 발송하였습니다.' });
        } catch (error) {
            console.log('error: ', error);
            // Joi
            if (error.isJoi) {
                const { message } = error.details[0];
                return res.status(400).json({ success: false, message, error });
            }
            if (error.name === 'EmailExistError') {
                return res.status(400).json({ success: false, message: error.message, error });
            }
            return res.status(400).json({
                success: false,
                message: '인증번호 발송에 실패했습니다. 다시 확인해주세요.',
                error,
            });
        }
    };

    // 이메일 인증번호 확인
    checkAuthNumber = async (req, res, next) => {
        try {
            const { authNumber, email } = await authNumberSchema.validateAsync(req.body);

            await this.userService.verifyAuthNumber({ email, authNumber });

            return res.status(200).json({ success: true, message: '인증되었습니다.' });
        } catch (error) {
            console.log('error : ', error);
            // Joi
            if (error.isJoi) {
                const { message } = error.details[0];
                return res.status(400).json({ success: false, message, error });
            }

            if (['AuthNumberFailedVerifyError', 'AuthNumberExpiredError'].includes(error.name)) {
                return res.status(400).json({ success: false, message: error.message, error });
            }

            return res.status(400).json({
                success: false,
                message: '인증에 실패했습니다. 다시 확인해주세요.',
                error,
            });
        }
    };

    // 카카오 소셜로그인
    kakaoLogin = async (req, res, next) => {
        try {
            const { name, email, phone_number } = req.user._json.kakao_account;

            const { userId } = await this.userService.kakaoSignUp({ name, email, phone_number });

            const accessToken = await this.userService.generateAccessToken({ userId });
            const refreshToken = await this.userService.generateRefreshToken();

            // Set RefreshToken in Redis
            await this.userService.setRefreshTokenInDB({ userId, refreshToken });

            return res.redirect(
                url.format({
                    pathname: `${process.env.SOCIAL_REDIRECT_URL}/login/kakao`,
                    query: {
                        success: true,
                        message: '로그인에 성공했습니다.',
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    },
                })
            );
        } catch (error) {
            console.log(error);
            return res.redirect(
                url.format({
                    pathname: `${process.env.SOCIAL_REDIRECT_URL}/login/kakao`,
                    query: {
                        success: false,
                        message: error.message,
                        error,
                    },
                })
            );
        }
    };

    // 네이버 소셜로그인
    naverLogin = async (req, res, next) => {
        try {
            const { email, mobile, name } = req.user._json.response;

            const { userId } = await this.userService.naverSignUp({ email, mobile, name });

            const accessToken = await this.userService.generateAccessToken({ userId });
            const refreshToken = await this.userService.generateRefreshToken();

            // Set RefreshToken in Redis
            await this.userService.setRefreshTokenInDB({ userId, refreshToken });

            return res.redirect(
                url.format({
                    pathname: `${process.env.SOCIAL_REDIRECT_URL}/login/naver`,
                    query: {
                        success: true,
                        message: '로그인에 성공했습니다.',
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    },
                })
            );
        } catch (error) {
            console.log(error);
            return res.redirect(
                url.format({
                    pathname: `${process.env.SOCIAL_REDIRECT_URL}/login/naver`,
                    query: {
                        success: false,
                        message: error.message,
                        error,
                    },
                })
            );
        }
    };

    // 구글 소셜로그인
    googleLogin = async (req, res, next) => {
        try {
            const { name, email } = req.user._json;

            const { userId } = await this.userService.googleLogin({ name, email });

            const accessToken = await this.userService.generateAccessToken({ userId });
            const refreshToken = await this.userService.generateRefreshToken();

            // Set RefreshToken in Redis
            await this.userService.setRefreshTokenInDB({ userId, refreshToken });

            return res.redirect(
                url.format({
                    pathname: `${process.env.SOCIAL_REDIRECT_URL}/login/google`,
                    query: {
                        success: true,
                        message: '로그인에 성공했습니다.',
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    },
                })
            );
        } catch (error) {
            console.log(error);
            return res.redirect(
                url.format({
                    pathname: `${process.env.SOCIAL_REDIRECT_URL}/login/google`,
                    query: {
                        success: false,
                        message: error.message,
                        error,
                    },
                })
            );
        }
    };

    // 일반 로그인
    signIn = async (req, res, next) => {
        try {
            const { email, password } = await signInSchema.validateAsync(req.body);

            const { userId } = await this.userService.signIn({ email, password });

            const accessToken = await this.userService.generateAccessToken({ userId });
            const refreshToken = await this.userService.generateRefreshToken();

            // Set RefreshToken in Redis
            await this.userService.setRefreshTokenInDB({ userId, refreshToken });

            return res.status(200).json({
                success: true,
                message: '로그인에 성공했습니다.',
                accessToken,
                refreshToken,
            });
        } catch (error) {
            // Joi
            if (error.isJoi) {
                const { message } = error.details[0];
                return res.status(400).json({ success: false, message, error });
            }

            if (
                ['UserNotFoundError', 'PasswordNotMatchedError', 'WithdrawUserError'].includes(
                    error.name
                )
            ) {
                return res.status(400).json({ success: false, message: error.message, error });
            }

            return res
                .status(400)
                .json({ success: false, message: '로그인에 실패했습니다.', error });
        }
    };

    // Access Token 재발급
    refresh = async (req, res, next) => {
        try {
            const { authorization } = req.headers;
            const { refreshToken } = req.body;

            console.log('authorization : ', authorization);
            console.log('refreshToken : ', refreshToken);

            // Access Token 이나 Refresh Token 이 존재하지 않을 때
            if (!authorization || !refreshToken) {
                throw new CustomError(ErrorNames.TokenNotFoundError, '토큰이 존재하지 않습니다.');
            }

            const accessToken = authorization.split('Bearer ')[1];

            // Access Token 검증
            const isAccessTokenVerified = await this.userService.verifyAccessToken({ accessToken });

            // Access Token 만료
            if (!isAccessTokenVerified) {
                // payload 가져오기
                const { userId } = jwt.decode(accessToken, process.env.JWT_SECRET);

                // Refresh Token 검증
                const isRefreshTokenVerified = await this.userService.verifyRefreshToken({
                    refreshToken,
                    userId,
                });

                // Refresh Token 만료 -> 로그인 필요
                if (!isRefreshTokenVerified) {
                    throw new CustomError(ErrorNames.NeedLoginError, '다시 로그인 해주세요.');
                }

                // Access Token 재발급
                const newAccessToken = await this.userService.generateAccessToken({ userId });

                return res.status(201).json({ success: true, accessToken: newAccessToken });
            }

            // Access Token 유효 -> 재발급 X
            return res.status(201).json({ success: true, accessToken });
        } catch (error) {
            console.log(error);

            switch (error.name) {
                // 토큰이 존재하지 않을 때
                case 'TokenNotFoundError':
                    res.status(400).json({ success: false, message: error.message, error });
                    break;
                // 토큰 변조
                case 'JsonWebTokenError':
                    res.status(401).json({
                        success: false,
                        message: '토큰이 변조되었습니다.',
                        error,
                    });
                    break;
                // 잘못된 Refresh Token
                case 'RefreshTokenNotMatchedError':
                    res.status(401).json({ success: false, message: error.message, error });
                    break;
                // Access, Refresh 둘다 만료 -> 로그인 필요
                case 'NeedLoginError':
                    res.status(401).json({ success: false, message: error.message, error });
                    break;

                default:
                    res.status(401).json({
                        success: false,
                        message: '비정상적인 요청입니다.',
                        error,
                    });
                    break;
            }
        }
    };

    // 회원 정보 가져오기
    getUserInfo = async (req, res, next) => {
        try {
            const userId = req.userId;
            const userInfo = await this.userService.getUserInfo({ userId });

            return res.status(200).json({ success: true, userInfo });
        } catch (error) {
            return res
                .status(400)
                .json({ success: false, message: '회원 정보를 가져올 수 없습니다.' });
        }
    };

    // 회원 비밀번호 변경
    updatePassword = async (req, res, next) => {
        try {
            const userId = req.userId;
            const { password, newPassword } = await updatePasswordSchema.validateAsync(req.body);

            await this.userService.updatePassword({ userId, password, newPassword });

            return res.status(200).json({ success: true, message: '비밀번호를 변경하였습니다.' });
        } catch (error) {
            console.log(error);
            // Joi
            if (error.isJoi) {
                const { message } = error.details[0];
                return res.status(400).json({ success: false, message, error });
            }
            if (error.name === 'PasswordNotMatchedError') {
                return res.status(400).json({ success: false, message: error.message, error });
            }
            return res
                .status(400)
                .json({ success: false, message: '비밀번호 변경에 실패했습니다.', error });
        }
    };

    // 회원 휴대폰번호 변경
    updatePhone = async (req, res, next) => {
        try {
            const userId = req.userId;
            const { newPhone } = await updatePhoneSchema.validateAsync(req.body);

            await this.userService.updatePhone({ userId, newPhone });

            return res.status(200).json({ success: true, message: '전화번호를 변경하였습니다.' });
        } catch (error) {
            console.log(error);
            // Joi
            if (error.isJoi) {
                const { message } = error.details[0];
                return res.status(400).json({ success: false, message, error });
            }

            if (error.name == 'PhoneNumberError') {
                return res.status(400).json({ success: false, message: error.message, error });
            }

            return res
                .status(400)
                .json({ success: false, message: '전화번호 변경에 실패했습니다.', error });
        }
    };

    // 회원 탈퇴
    withdrawal = async (req, res, next) => {
        try {
            const userId = req.userId;
            const { password, reason } = await withdrawalSchema.validateAsync(req.body);

            await this.userService.withdrawal({ userId, password, reason });

            return res
                .status(200)
                .json({ success: true, message: '성공적으로 회원탈퇴 되었습니다.' });
        } catch (error) {
            console.log(error);
            // Joi
            if (error.isJoi) {
                const { message } = error.details[0];
                return res.status(400).json({ success: false, message, error });
            }
            if (error.name === 'PasswordNotMatchedError') {
                return res.status(400).json({ success: false, message: error.message, error });
            }

            return res
                .status(400)
                .json({ success: false, message: '회원탈퇴에 실패했습니다.', error });
        }
    };
}

module.exports = UserController;

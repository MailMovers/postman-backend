const {
    signUpSchema,
    emailAuthSchema,
    authNumberSchema,
    signInSchema,
} = require('../utils/validation');
const { UserService } = require('../services');
const { ErrorNames, CustomError } = require('../utils/customErrors');
const jwt = require('jsonwebtoken');

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

            const { hashedAuthNumber } = await this.userService.sendEmail({ email });

            // 암호화된 인증번호 쿠키 3분
            res.cookie('HAN', hashedAuthNumber, {
                httpOnly: true,
                maxAge: 180000,
            });
            return res.status(200).json({ success: true, message: '인증번호를 발송하였습니다.' });
        } catch (error) {
            // Joi
            if (error.isJoi) {
                const { message } = error.details[0];
                return res.status(400).json({ success: false, message });
            }
            if (error.name === 'EmailExistError') {
                return res.status(400).json({ success: false, message: error.message });
            }
            return res.status(400).json({
                success: false,
                message: '인증번호 발송에 실패했습니다. 다시 확인해주세요.',
            });
        }
    };

    // 이메일 인증번호 확인
    checkAuthNumber = async (req, res, next) => {
        try {
            const { authNumber } = await authNumberSchema.validateAsync(req.body);
            const { HAN } = req.cookies;

            await this.userService.verifyAuthNumber({ authNumber, HAN });

            return res.status(200).json({ success: true, message: '인증되었습니다.' });
        } catch (error) {
            // Joi
            if (error.isJoi) {
                const { message } = error.details[0];
                return res.status(400).json({ success: false, message });
            }
            if (error.name === 'AuthNumberFailedVerifyError') {
                return res.status(400).json({ success: false, message: error.message });
            }
            return res
                .status(400)
                .json({ success: false, message: '인증에 실패했습니다. 다시 확인해주세요.' });
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
            await this.userService.setRefreshTokenInRedis({ userId, refreshToken });

            return res.status(200).json({
                success: true,
                message: '로그인에 성공했습니다.',
                accessToken,
                refreshToken,
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ success: false, message: '로그인에 실패했습니다.' });
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
            await this.userService.setRefreshTokenInRedis({ userId, refreshToken });

            return res.status(200).json({
                success: true,
                message: '로그인에 성공했습니다.',
                accessToken,
                refreshToken,
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ success: false, message: '로그인에 실패했습니다.' });
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
            await this.userService.setRefreshTokenInRedis({ userId, refreshToken });

            return res.status(200).json({
                success: true,
                message: '로그인에 성공했습니다.',
                accessToken,
                refreshToken,
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ success: false, message: '로그인에 실패했습니다.' });
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
            await this.userService.setRefreshTokenInRedis({ userId, refreshToken });

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
                return res.status(400).json({ success: false, message });
            }
            if (error.name === 'UserNotFoundError' || error.name === 'PasswordNotMatchedError') {
                return res.status(400).json({ success: false, message: error.message });
            }
            return res.status(400).json({ success: false, message: '로그인에 실패했습니다.' });
        }
    };

    // Access Token 재발급
    refresh = async (req, res, next) => {
        try {
            const { authorization } = req.headers;
            const { refreshToken } = req.body;

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
                    res.status(400).json({ success: false, message: error.message });
                    break;
                // 토큰 변조
                case 'JsonWebTokenError':
                    res.status(401).json({ success: false, message: '토큰이 변조되었습니다.' });
                    break;
                // 잘못된 Refresh Token
                case 'RefreshTokenNotMatchedError':
                    res.status(401).json({ success: false, message: error.message });
                    break;
                // Access, Refresh 둘다 만료 -> 로그인 필요
                case 'NeedLoginError':
                    res.status(401).json({ success: false, message: error.message });
                    break;

                default:
                    res.status(401).json({ success: false, message: '비정상적인 요청입니다.' });
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
}

module.exports = UserController;

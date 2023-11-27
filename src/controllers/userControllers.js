const { signUpSchema, emailAuthSchema, authNumberSchema } = require('../utils/validation');
const { UserService } = require('../services');

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
}

module.exports = UserController;

const { signUpSchema, emailAuthSchema } = require('../utils/validation');
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

            await this.userService.sendEmail({ email });
        } catch (error) {
            console.log(error);
            // Joi
            if (error.isJoi) {
                const { message } = error.details[0];
                return res.status(400).json({ success: false, message });
            }
            if (error.name === 'EmailExistError') {
                return res.status(400).json({ success: false, message: error.message });
            }
        }
    };
}

module.exports = UserController;

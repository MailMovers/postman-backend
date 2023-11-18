const { signUpSchema } = require('../utils/validation');

// 회원가입 Controller
const signUpController = async (req, res, next) => {
    try {
        const { name, email, phone, password } = await signUpSchema.validateAsync(req.body);
    } catch (error) {
        // Joi
        if (error.isJoi) {
            const { message } = error.details[0];
            return res.status(400).json({ message });
        }
    }
};

module.exports = { signUpController };

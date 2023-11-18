const Joi = require('joi');

const letterSchema = Joi.object({
    sender: Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
    }),
    recipient: Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
    }),
    content: Joi.string().required(),
});

// 회원가입 유효성검사
const signUpSchema = Joi.object({
    name: Joi.string().pattern(new RegExp('^[가-힣a-zA-Z]+$')).min(2).max(10).required().messages({
        'string.base': '이름은 문자열이어야 합니다.',
        'any.required': '이름을 입력해주세요.',
        'string.min': '이름은 최소 2글자입니다.',
        'string.max': '이름은 최대 10글자입니다.',
        'string.pattern.base': '이름이 형식에 맞지 않습니다.',
    }),
    email: Joi.string().email().required().messages({
        'string.base': '이메일은 문자열이어야 합니다.',
        'any.required': '이메일을 입력해주세요.',
        'string.email': '이메일이 유효하지 않습니다.',
    }),
    phone: Joi.string().required().messages({
        'string.base': '전화번호는 문자열이어야 합니다.',
        'any.required': '전화번호를 입력해주세요.',
    }),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#%^&*-_+=])[a-z0-9!@#%^&*-_+=]+$'))
        .min(8)
        .max(12)
        .required()
        .messages({
            'string.base': '비밀번호는 문자열이어야 합니다.',
            'any.required': '비밀번호를 입력해주세요.',
            'string.min': '비밀번호는 최소 8자리입니다.',
            'string.max': '비밀번호는 최대 12자리입니다.',
            'string.pattern.base': '비밀번호가 형식에 맞지 않습니다.',
        }),
    passwordCheck: Joi.any()
        .valid(Joi.ref('password'))
        .required()
        .messages({ 'any.only': '비밀번호가 일치하지 않습니다.' }),
});

const customMessages = {
    'any.required': '{{#label}} is required.',
    'string.base': '{{#label}} must be a string.',
    'string.empty': '{{#label}} cannot be empty.',
};

module.exports = {
    letterSchema,
    customMessages,
    signUpSchema,
};

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

// 이메일 중복 체크 유효성검사
const emailCheckSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': '이메일은 문자열이어야 합니다.',
        'any.required': '이메일을 입력해주세요.',
        'string.email': '이메일이 유효하지 않습니다.',
    }),
});

// 일반 로그인 유효성검사
const signInSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': '이메일은 문자열이어야 합니다.',
        'any.required': '이메일을 입력해주세요.',
        'string.email': '이메일이 유효하지 않습니다.',
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
});

// 비밀번호 변경 유효성검사
const updatePasswordSchema = Joi.object({
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
    newPassword: Joi.string()
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
});

// 전화번호 변경 유효성검사
const updatePhoneSchema = Joi.object({
    newPhone: Joi.string().required().messages({
        'string.base': '전화번호는 문자열이어야 합니다.',
        'any.required': '전화번호를 입력해주세요.',
    }),
});

// 회원탈퇴 유효성검사
const withdrawalSchema = Joi.object({
    password: Joi.string().required().messages({
        'string.base': '비밀번호는 문자열이어야 합니다.',
        'any.required': '비밀번호를 입력해주세요.',
    }),
    reason: Joi.string().max(500).allow('', null).optional().messages({
        'string.base': '탈퇴사유는 문자열이어야 합니다.',
        'string.max': '탈퇴사유는 최대 500자입니다.',
    }),
});

const customMessages = {
    'any.required': '{{#label}} is required.',
    'string.base': '{{#label}} must be a string.',
    'string.empty': '{{#label}} cannot be empty.',
};

/* 사용하지 않는 유효성검사 */
// // 이메일 인증 유효성검사
// const emailAuthSchema = Joi.object({
//     email: Joi.string().email().required().messages({
//         'string.base': '이메일은 문자열이어야 합니다.',
//         'any.required': '이메일을 입력해주세요.',
//         'string.email': '이메일이 유효하지 않습니다.',
//     }),
// });

// // 인증번호 유효성검사
// const authNumberSchema = Joi.object({
//     authNumber: Joi.string().required().length(6).message({
//         'string.base': '인증번호는 문자열이어야 합니다.',
//         'any.required': '인증번호를 입력해주세요.',
//         'string.length': '인증번호는 6자리입니다.',
//     }),
//     email: Joi.string().email().required().messages({
//         'string.base': '이메일은 문자열이어야 합니다.',
//         'any.required': '이메일을 입력해주세요.',
//         'string.email': '이메일이 유효하지 않습니다.',
//     }),
// });

module.exports = {
    letterSchema,
    customMessages,
    signUpSchema,
    emailCheckSchema,
    signInSchema,
    updatePasswordSchema,
    updatePhoneSchema,
    withdrawalSchema,
};

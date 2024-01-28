const ErrorNames = {
    EmailExistError: 'EmailExistError',
    AuthNumberFailedVerifyError: 'AuthNumberFailedVerifyError',
    UserNotFoundError: 'UserNotFoundError',
    PasswordNotMatchedError: 'PasswordNotMatchedError',
    AccessTokenNotFoundError: 'AccessTokenNotFoundError',
    TokenNotFoundError: 'TokenNotFoundError',
    RefreshTokenNotMatchedError: 'RefreshTokenNotMatchedError',
    NeedLoginError: 'NeedLoginError',
    PhoneNumberError: 'PhoneNumberError',
    WithdrawUserError: 'WithdrawUserError',
    AuthNumberExpiredError: 'AuthNumberExpiredError',
};

class CustomError extends Error {
    constructor(name, message) {
        super(message);
        this.name = name;
    }
}

module.exports = { ErrorNames, CustomError };

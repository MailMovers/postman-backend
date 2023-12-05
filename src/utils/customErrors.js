const ErrorNames = {
    EmailExistError: 'EmailExistError',
    AuthNumberFailedVerifyError: 'AuthNumberFailedVerifyError',
    UserNotFoundError: 'UserNotFoundError',
    PasswordNotMatchedError: 'PasswordNotMatchedError',
    AccessTokenNotFoundError: 'AccessTokenNotFoundError',
};

class CustomError extends Error {
    constructor(name, message) {
        super(message);
        this.name = name;
    }
}

module.exports = { ErrorNames, CustomError };

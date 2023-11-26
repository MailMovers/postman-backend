const ErrorNames = {
    EmailExistError: 'EmailExistError',
};

class CustomError extends Error {
    constructor(name, message) {
        super(message);
        this.name = name;
    }
}

module.exports = { ErrorNames, CustomError };

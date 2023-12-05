const jwt = require('jsonwebtoken');
const { ErrorNames, CustomError } = require('../utils/customErrors');

module.exports = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            throw new CustomError(ErrorNames.AccessTokenNotFoundError, '토큰이 존재하지 않습니다.');
        }

        const accessToken = authorization.split('Bearer ')[1];

        // 토큰 검증
        const { userId } = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

        req.userId = userId;

        next();
    } catch (error) {
        // 토큰이 존재하지 않을 때
        if (error.name === 'AccessTokenNotFoundError') {
            return res.status(401).json({ success: false, message: error.message });
        }
        // 토큰 만료
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: '토큰이 만료되었습니다.' });
        }
        // 토큰 변조
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: '토큰이 변조되었습니다.' });
        }

        return res
            .status(401)
            .json({ success: false, message: error.message ?? '비정상적인 요청입니다.' });
    }
};

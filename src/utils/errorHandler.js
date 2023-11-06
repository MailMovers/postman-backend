const { customMessages } = require('../utils/validation');

const validationData = (data, schema) => {
  const options = {
    abortEarly: false,
    messages: customMessages,
  }

  const { error, value } = schema.validate(data, options);

  if (error) {
    throw error;
  }
  return value
};

const errorHandler = (err, req, res, next) => {
  console.log("Middleware Error Handling");
  console.log(err);

  if (err.name === "ValidationError") {
    res.status(400).json({ success: false, errorMessage: "요청 데이터의 유효성 검사에 실패했습니다." });
  } else if (err.name === "AnotherErrorType") {
    res.status(500).json({ success: false, errorMessage: "서버 에러가 발생했습니다." });
  } else {
    res.status(500).json({ success: false, errorMessage: "알 수 없는 에러가 발생했습니다." });
  }
};

module.exports = {
  errorHandler,
  validationData
};

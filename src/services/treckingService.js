const request = require("request");

const url =
  "http://openapi.epost.go.kr/trace/retrieveLongitudinalCombinedService/retrieveLongitudinalCombinedService/getLongitudinalCombinedList";
const queryParams = "?" + encodeURIComponent(process.env.DATAGOV_SECRET_KEY);
const tracking = async (number) => {
  try {
    queryParams +=
      "&" + encodeURIComponent("rgist") + "=" + encodeURIComponent(number);
    request({
      url: url + queryParams,
      method: "GET",
    });
    return;
  } catch (err) {
    console.error(error);
    throw error;
  }
};

module.exports = tracking;

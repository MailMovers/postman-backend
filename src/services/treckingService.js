const axios = require("axios");

const url =
  "http://openapi.epost.go.kr/trace/retrieveLongitudinalCombinedService/retrieveLongitudinalCombinedService/getLongitudinalCombinedList";
let queryParams = "?" + encodeURIComponent(process.env.DATAGOV_SECRET_KEY);
const tracking = async (number) => {
  try {
    queryParams +=
      "&" + encodeURIComponent("rgist") + "=" + encodeURIComponent(number);
    const response = await axios.get(url + queryParams);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = tracking;

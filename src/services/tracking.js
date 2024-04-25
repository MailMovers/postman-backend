const axios = require("axios");
const { updateLetterTrackStatusDao } = require("../models/writingLetterDao");

const tracking = async (status, registration_number, letterId) => {
  if (status == "배송완료") {
    return status;
  } else {
    try {
      const url = "http://openapi.epost.go.kr/trace/retrieveLongitudinalCombinedService/retrieveLongitudinalCombinedService/getLongitudinalCombinedList";
      let queryParams = "?" + encodeURIComponent("ServiceKey") + "=" + encodeURIComponent(process.env.DATAGOV_SECRET_KEY);
      // 테스트떄 체크 필요 = 을 뺴야할지 말지 
      queryParams += "&" + encodeURIComponent("rgist") + "=" + encodeURIComponent(registration_number);
      
      const response = await axios.get(url + queryParams);
      const insertInfo = response.data.trackState;

      if (insertInfo == "배송완료") {
        await updateLetterTrackStatusDao("배송완료", letterId);
        return "배송완료";
      } else {
        const result = response.data.Statue
        return result
      }
    } catch (error) {
      console.error("Tracking error:", error);
      throw error;
    }
  }
};

module.exports = tracking;

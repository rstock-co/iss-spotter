const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

const IP = fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned IP:", ip);
  return ip;
});

fetchCoordsByIP("24.64.88.137", (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned coords:", data);
  return data;
});

fetchISSFlyOverTimes(
  { latitude: 50.0405486, longitude: -110.6764258 },
  (error, data) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }

    console.log("It worked! Returned fly times:", data);
    return data;
  }
);

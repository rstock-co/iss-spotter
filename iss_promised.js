// iss_promised.js
const request = require('request-promise-native');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

/* 
 * Makes a request to ipwho.is using the provided IP address to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = (body) => {

  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);

};

/*
 * Requests data from api.open-notify.org using provided lat/long data
 * Input: JSON body containing geo data response from ipwho.is
 * Returns: Promise of request for fly over data, returned as JSON string
 */

const fetchISSFlyOverTimes = body => {
  const { latitude, longitude } = JSON.parse(body);
  const url = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(data => {
    const parsedData = JSON.parse(data);
    const { response } = parsedData;
    return response;
  });
};

module.exports = { nextISSTimesForMyLocation };
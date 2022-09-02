/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require("request");

const log = (variable) => {
  const key = Object.keys(variable)[0];
  const value = variable[key];
  console.log(`${key}: ${value}`);
};

const API1 = "https://api.ipify.org?format=json";
const API2 = "http://ipwho.is/";
const API3 = "https://iss-pass.herokuapp.com/json/?";

const fetchMyIP = (callback) => {
  request(API1, (error, response, body) => {
    if (error) return callback(error, null);

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }

    const ip = JSON.parse(body).ip;
    return callback(null, ip);
  });
};

/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */

const fetchCoordsByIP = (ip, callback) => {
  request(`${API2}${ip}`, (error, response, body) => {
    if (error) return callback(error, null);

    body = JSON.parse(body);
    // if non-200 status, assume server error
    if (body.success === false) {
      const msg = `Success status was ${body.false}. Server message says: ${body.message} when fetching for IP ${ip}`;
      return callback(Error(msg), null);
    }

    const { latitude, longitude } = body;

    return callback(null, { latitude, longitude });
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = ({ latitude, longitude }, callback) => {
  request(
    `${API3}lat=${latitude}&lon=${longitude}`,
    (error, response, body) => {
      if (error) return callback(error, null);

      body = JSON.parse(body);
      // if non-200 status, assume server error
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching ISS pass times. Response: ${body}`;
        return callback(Error(msg), null);
      }
      const passes = body.response;

      return callback(null, passes);
    }
  );
};
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };

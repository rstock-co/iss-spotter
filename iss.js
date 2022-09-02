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

    return callback(null, {latitude, longitude});
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };

const { fetchMyIP, fetchCoordsByIP } = require('./iss');

const IP = fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
  return ip;
});

fetchCoordsByIP('24.64.88.137', (error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned coords:' , data);
  return data;
});
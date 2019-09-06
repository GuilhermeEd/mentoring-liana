const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://api.codenation.dev/v1/challenge/dev-ps',
});


module.exports = instance;

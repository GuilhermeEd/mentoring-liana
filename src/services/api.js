const http = require('../utils/http');
const FormData = require('form-data');
const { TOKEN } = require('../utils/constants');

const generateData = () => {
  return http.get(`/generate-data?token=${TOKEN}`)
    .then(res => res.data)
    .catch(err => console.error('Error:', err.response.data));
};

const submitSolution = (file) => {
  const form = new FormData();
  form.append('answer', file);

  return http.post(`/submit-solution?token=${TOKEN}`, form, { headers: form.getHeaders() })
    .then(res => res.data)
    .catch(err => console.error('Error:', err.response.data));
};

module.exports = {
  generateData,
  submitSolution,
};

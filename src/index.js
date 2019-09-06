const fs = require('fs');
const crypto = require('crypto-js');

const api = require('./services/api');
const cipher = require('./services/cipher');

const PATH = `${__dirname}/answer.json`;

api.generateData()
  .then(json => {
    const { cifrado, numero_casas } = json;

    fs.writeFileSync(PATH, JSON.stringify(json, null, 2));
    console.log('File saved!');
    
    const decodeChar = (char) => cipher.decodeChar(char, numero_casas);
    const decoded = cifrado
    .split('')
    .map(decodeChar)
    .join('');
    
    const sha1 = crypto.SHA1(decoded).toString();
    
    json.decifrado = decoded;
    json.resumo_criptografico = sha1;
    console.log('The decoded message is', `"${decoded}"`);
    console.log('and the respective sha1', `"${sha1}"`);

    fs.writeFileSync(PATH, JSON.stringify(json, null, 2));
    console.log('File updated!');

    const file = fs.createReadStream(PATH);

    console.log('Sending file ...');
    api.submitSolution(file)
      .then(({ score }) => console.log(`Your score is: ${score}`));
  })
  .catch(console.error);

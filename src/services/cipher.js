const { ALPHABET } = require('../utils/constants');

const decodeChar = (char, offset) => {
  const isChar = !!char.toLowerCase().match(/[a-z]/);
  if (!isChar) return char;
  const index = ALPHABET.indexOf(char.toLowerCase());
  const converted = ALPHABET.slice(index - offset)[0];
  return converted;
};

module.exports = {
  decodeChar,
};
/**
 * @type {import('prettier').Config}
 */
const config = {
  singleQuote: true,
  plugins: [require('prettier-plugin-organize-imports')],
};

module.exports = config;

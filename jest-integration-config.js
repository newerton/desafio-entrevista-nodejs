/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('./jest.config');
config.testRegex = '/tests/integration/.*.spec.ts';
module.exports = config;

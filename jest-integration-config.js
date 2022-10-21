const config = require('./jest.config');
config.testRegex = '/tests/integration/.*.spec.ts';
module.exports = config;

module.exports = {
  displayName: {
    name: '@core',
    color: 'magenta',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './src',
  testRegex: '.*\\.spec\\.ts$',
  collectCoverageFrom: ['<rootDir>/app/**/*.(t|j)s'],
  coverageProvider: 'v8',
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/app/$1',
    '^@common/(.*)$': '<rootDir>/common/$1',
  },
};

const tsPreset = require('ts-jest/jest-preset')

module.exports = {
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/main/server.ts',
    '!**/*.d.ts'
  ],
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  ...tsPreset,
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1'
  },
  watchPathIgnorePatterns: ['globalConfig', 'tokens', 'index'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
}

module.exports = {
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageProvider: 'babel',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1'
  },
  watchPathIgnorePatters: ['globalConfig']
}

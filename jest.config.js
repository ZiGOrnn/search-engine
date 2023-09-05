module.exports = {
  // Other Jest configuration options...
  collectCoverageFrom: ['**/*.controller.ts', '**/*.service.ts'],
  coverageDirectory: './client/coverage',
  coverageReporters: ['lcov'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './client/report',
        filename: 'index.html',
        openReport: false,
      },
    ],
  ],
};

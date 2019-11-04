module.exports = {
  testURL: 'http://localhost/',
  collectCoverage: true,
  coverageDirectory: './coverage',
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  },
};

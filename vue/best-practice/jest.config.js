module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    //vue中 @ 以外的别名，这里定义
    '^@comps/(.*)$': '<rootDir>/src/components/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,vue}'],
}

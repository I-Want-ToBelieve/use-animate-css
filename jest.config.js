// https://github.com/formik/tsdx#jest
module.exports = {
  transform: {
    // https://github.com/facebook/jest/issues/9395#issuecomment-583799300
    // https://github.com/formik/tsdx/blob/master/src/createJestConfig.ts
    '.(ts|tsx)$': require.resolve('ts-jest/dist'),
    '.(js|jsx)$': require.resolve('babel-jest'), // jest's default
    // https://github.com/facebook/jest/issues/8605
    // https://github.com/eddyerburgh/jest-transform-stub#usage
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  // https://jestjs.io/docs/zh-Hans/webpack#%E6%A8%A1%E6%8B%9F-css-%E6%A8%A1%E5%9D%97
  moduleNameMapper: {
    '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
}

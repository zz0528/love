module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8']
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
      selectorBlackList: ['html', 'van-circle__layer'],
      minPixelValue: 1.5,
      mediaQuery: false,
      exclude: 'common'
    }
  }
}

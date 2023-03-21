module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          crypto: '@chainsoft/react-native-quick-crypto',
          buffer: '@craftzdog/react-native-buffer',
        },
      },
    ],
  ],
};
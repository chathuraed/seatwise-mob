module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'dotenv-import',
      {
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: false,
      },
    ],
  ],
};

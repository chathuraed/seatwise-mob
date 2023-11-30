const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config')

module.exports = (async () => {
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig()

  const additionalConfig = {
    resolver: {
      assetExts: [...assetExts, 'png', 'jpg'],
      sourceExts: [...sourceExts, 'js', 'json', 'ts', 'tsx', 'jsx'],
    },
  }

  const defaultConfig = await getDefaultConfig(__dirname)
  const mergedConfig = mergeConfig(defaultConfig, additionalConfig)

  return mergedConfig
})()

const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);
  // Support .cjs files (used by react-native-svg)
  defaultConfig.resolver.sourceExts.push('cjs');
  // Treat .svg as assets
  defaultConfig.resolver.assetExts.push('svg');
  // Allow .css imports (Leaflet stylesheet)
  defaultConfig.resolver.sourceExts.push('css');
  // Ensure inline requires are disabled for clearer debugging
  defaultConfig.transformer.getTransformOptions = async () => ({
    transform: { experimentalImportSupport: false, inlineRequires: false },
  });
  return defaultConfig;
})();

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'module:react-native-dotenv',
      'tsconfig-paths-module-resolver',
      [
        'module-resolver',
        {
          alias: {
            '@/*': './src/*',
            '@/features': './src/features',
            '@/components': './src/components',
            '@/stores': './src/features',
            '@/hooks': './src/hooks',
            '@/utils': './src/utils',
            '@/lib': './src/lib',
          },
        },
      ],
    ],
  };
};

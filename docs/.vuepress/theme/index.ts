const { path } = require('@vuepress/utils')

module.exports = {
  layouts: {
    Layout: path.resolve(__dirname, 'src/client/layouts/Layout.vue'),
    404: path.resolve(__dirname, 'src/client/layouts/404.vue'),
  },
  clientAppEnhanceFiles: path.resolve(__dirname, 'src/client/clientAppEnhance.ts'),
  clientAppSetupFiles: path.resolve(__dirname, 'src/client/clientAppSetup.ts'),
  plugins: [
    [
      '@vuepress/plugin-palette',
      { preset: 'sass' },
    ],
    [
      '@vuepress/plugin-theme-data',
      {
        themeData: {
          darkMode: true,
          toggleDarkMode: '切换夜间模式',
        },
      },
    ],
  ],
}
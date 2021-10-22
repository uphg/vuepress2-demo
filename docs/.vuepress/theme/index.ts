const { path } = require('@vuepress/utils')

module.exports = (options, app) => {
  console.log('options')
  console.log(options)
  return {
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
          themeData: options,
        },
      ],
      [
        '@vuepress/plugin-prismjs',
        {
          preloadLanguages: ['markdown', 'jsdoc', 'yaml', 'html', 'css', 'javascript', 'js', 'vue']
        }
      ]
    ],
  }
}
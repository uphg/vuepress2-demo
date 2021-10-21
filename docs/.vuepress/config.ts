import path from 'path'
const fooPlugin = require('../plugins/foo.ts') 

export default {
  // theme: themeConfig => {
  //   return {
  //     layouts: {
  //       Layout: path.resolve(__dirname, 'docs/.vuepress/theme/layouts/Layout.vue'),
  //       404: path.resolve(__dirname, 'docs/.vuepress/theme/layouts/404.vue'),
  //       FooBar: path.resolve(__dirname, 'docs/.vuepress/theme/layouts/FooBar.vue'),
  //     },
  //   }
  // },
  plugins: [
    [
      fooPlugin,
      {
        optionA: 123,/* 选项 */
      },
    ]
  ],
}
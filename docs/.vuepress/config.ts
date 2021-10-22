import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

const { path } = require('@vuepress/utils')
const fooPlugin = require('../plugins/foo.ts') 


export default defineUserConfig<DefaultThemeOptions>({
  
  theme: path.resolve(__dirname, 'theme'),
  themeConfig: {

    darkMode: true,
    toggleDarkMode: '切换夜间模式',
    
    navbar: [
      {
        text: '指南',
        link: '/zh/guide/',
      },
      {
        text: '参考',
        link: '/zh/guide/',
      },
      {
        text: '插件',
        link: '/zh/guide/',
      }
    ]
  },
  plugins: [
    // [
    //   fooPlugin,
    //   {
    //     optionA: 123,/* 选项 */
    //   },
    // ],
    [
      '@vuepress/plugin-search',
      {
        placeholder: '搜索',
        maxSuggestions: 10,
      },
    ],
  ],
})
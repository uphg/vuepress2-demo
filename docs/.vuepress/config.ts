import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

const { path } = require('@vuepress/utils')

export default defineUserConfig<DefaultThemeOptions>({
  lang: 'zh-CN',
  title: 'VuePress',
  description: 'Vue 驱动的静态网站生成器',

  theme: path.resolve(__dirname, 'theme'),
  themeConfig: {
    
    author: '阿强',
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
    [
      '@vuepress/plugin-search',
      {
        placeholder: '搜索',
        maxSuggestions: 10,
      },
    ],
  ],
})
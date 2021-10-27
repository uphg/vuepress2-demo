import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

const { path } = require('@vuepress/utils')

export default defineUserConfig<DefaultThemeOptions>({
  lang: 'zh-CN',
  title: 'VuePress',
  description: 'Vue 驱动的静态网站生成器',
  head: [
    ['link', {rel: 'stylesheet', href: '/font/index.css'}],
  ],
  theme: path.resolve(__dirname, 'theme'),
  themeConfig: {
    darkMode: true,
    toggleDarkMode: '切换夜间模式',
    
    author: '阿强',

    lastUpdated: true,
    lastUpdatedText: '最后更新时间',

    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'uphg/blog',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '在 GitHub 上编辑此页面',

    contributorsText: '贡献者',
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
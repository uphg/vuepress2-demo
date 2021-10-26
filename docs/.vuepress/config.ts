import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

const { path } = require('@vuepress/utils')

export default defineUserConfig<DefaultThemeOptions>({
  lang: 'zh-CN',
  title: 'VuePress',
  description: 'Vue 驱动的静态网站生成器',

  theme: path.resolve(__dirname, 'theme'),
  themeConfig: {
    
    
    darkMode: true,
    toggleDarkMode: '切换夜间模式',
    
    author: '阿强',

    lastUpdated: true,
    lastUpdatedText: '最后更新时间',

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
    ],

    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'uphg/blog',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: 'GitHub',

    // 以下为可选的编辑链接选项

    // 假如你的文档仓库和项目本身不在一个仓库：
    // docsRepo: 'vuejs/vuepress',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '在 GitHub 上编辑此页面'
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
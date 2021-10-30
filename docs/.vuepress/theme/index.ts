import { find } from "./src/utils"

const { path } = require('@vuepress/utils')
const pluginBlog = require('./src/plugins/blog/index.ts')
const isProd = process.env.NODE_ENV === 'production'

interface NavLinkType { text: string; link: string; }

const createNavbar = (navbar, navLinks) => {
  for (let i = navLinks.length - 1; i >= 0; i--) {
    const navlink = navLinks[i]
    if (find<NavLinkType>(navlink || [], (item => item.link === navlink.link))) {
      continue
    }
    navbar.unshift(navlink)
  }
}

module.exports = (options, app) => {

  if (!(options.navbar && Array.isArray(options.navbar))) {
    options.navbar = []
  }

  createNavbar(options.navbar, [
    { text: '首页', link: '/' },
    { text: '归档', link: '/archives/' },
    { text: '标签', link: '/tags/' },
    { text: '关于', link: '/about/' },
  ])

  return {
    layouts: {
      Layout: path.resolve(__dirname, 'src/client/layouts/Layout.vue'),
      404: path.resolve(__dirname, 'src/client/layouts/404.vue'),
    },
    clientAppEnhanceFiles: path.resolve(__dirname, 'src/client/clientAppEnhance.ts'),
    clientAppSetupFiles: path.resolve(__dirname, 'src/client/clientAppSetup.ts'),
    plugins: [
      [ pluginBlog ],
      [
        '@vuepress/plugin-palette',
        { preset: 'sass' },
      ],
      [
        '@vuepress/plugin-theme-data',
        { themeData: options },
      ],
      
      /**
       * Shiki 是 VSCode 正在使用的代码高亮器。它具有更高的保真度，但比 Prism.js 要慢一些，特别是在有大量代码块需要处理的时候。
       * 你可以在 dev 模式下禁用该插件来获取更好的开发体验。主题参考：https://github.com/shikijs/shiki/blob/main/docs/themes.md
       */
      [
        '@vuepress/plugin-shiki',
        // {
        //   theme: 'dark-plus'
        // }
        isProd ? { theme: 'dark-plus' } : false,  //theme: 'material-ocean'
      ],
      ['@vuepress/nprogress'],
      ['@vuepress/plugin-git'],
      ['@vuepress/plugin-back-to-top'],
      ['@vuepress/plugin-medium-zoom', {
        selector:
          '.theme-default-content > img, .theme-default-content :not(a) > img',
        zoomOptions: {},
        // should greater than page transition duration
        delay: 400,
      }]
    ],
  }
}
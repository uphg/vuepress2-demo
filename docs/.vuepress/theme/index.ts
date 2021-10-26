const dayjs = require('dayjs')
const { path } = require('@vuepress/utils')
const pluginBlog = require('./src/plugins/blog/index.ts')

const isProd = process.env.NODE_ENV === 'production'

module.exports = (options, app) => {
  console.log('options')
  console.log(options)
  if (!(options.navbar && Array.isArray(options.navbar))) {
    options.navbar = []
  }

  options.navbar.unshift({ text: '关于', link: '/about/' })
  options.navbar.unshift({ text: '标签', link: '/tags/' })
  options.navbar.unshift({ text: '归档', link: '/archives/' })
  options.navbar.unshift({ text: '首页', link: '/' })

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
        {
          theme: 'dark-plus'
        }
        // isProd
        //   ? {
        //       theme: 'dark-plus',
        //       // theme: 'material-ocean',
        //     }
        //   : false,
      ],
      ['@vuepress/nprogress'],
      ['@vuepress/plugin-git']
    ],
  }
}
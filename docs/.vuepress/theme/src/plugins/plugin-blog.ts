const { path } = require('@vuepress/utils')
import { createPage } from '@vuepress/core';
const home = path.resolve(__dirname, 'src/template/README')

module.exports = (options, ctx) => {
  console.log('options')
  console.log(options)
  // console.log('ctx')
  // console.log(ctx)
  return {
    name: 'vuepress-plugin-foo',
    extendsPageOptions: (PageOptions, app) => {
      const { filePath } = PageOptions
      // console.log('filePath')
      // console.log(filePath)
      // console.log('\n' + 'PageOptions:')
      // console.log(PageOptions)
      // console.log('app')
      // console.log(app)
  
      // cache: [Function (anonymous)],
      // temp: [Function (anonymous)],
      // source: [Function (anonymous)],
      // dest: [Function (anonymous)],
      // client: [Function (anonymous)],
      // public: [Function (anonymous)]
      if (filePath?.startsWith(app.dir.source('posts/'))) {
        return {
          frontmatter: {
            foo: 'hi',
            permalinkPattern: '/:year/:month/:day/:slug.html', // 文件路径属性，可修改
          },
        }
      }
      return {}
    },
    // extendsPageData(page) {
    //   const { title, path } = page
    //   // console.log('page')
    //   // console.log(page)
    //   // console.log('path')
    //   // console.log(path)
    // },
    // async onGenerated(app) {
    //   // console.log('app')
    //   // console.log(app)
    //   // app.pages.forEach(item => {
    //   //   console.log('item.title')
    //   //   console.log(item.title)
    //   //   console.log('item.path')
    //   //   console.log(item.path)
    //   // });
    // },
    async onPrepared(app) {
      await app.writeTemp('foo.js', 'export const foo = \'bar\'')
    },
    // 初始化之后，所有的页面已经加载完毕
    async onInitialized(app) {
//       console.log('@ app.pages')
//       console.log(app.pages)
//       const archive = await createPage(app, {
//         path: '/archive',
//         // 设置 frontmatter
//         frontmatter: {
//           isArchive: true,
//           layout: 'Layout',
//         },
//         // 设置 markdown 内容
//         content: `\
// <Demo />
// `,
//       })
      // 如果主页不存在
      if (app.pages.every((page) => page.path !== '/')) {
        // 创建一个主页
        const homepage = await createPage(app, {
          path: '/',
          // 设置 frontmatter
          frontmatter: {
            home: true,
            layout: 'Layout',
          },
          // 设置 markdown 内容
          content: '我是首页'
        })
        // 把它添加到 `app.pages`
        app.pages.push(homepage)
      }
    }
  }
}
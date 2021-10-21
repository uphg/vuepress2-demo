
module.exports = async (options, ctx) => {
  console.log('options')
  console.log(options)
  console.log('ctx')
  console.log(ctx)
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
    extendsPageData(page) {
      const { title, path } = page
      // console.log('page')
      // console.log(page)
      // console.log('path')
      // console.log(path)
    },
    async onGenerated(app) {
      // console.log('app')
      // console.log(app)
      // app.pages.forEach(item => {
      //   console.log('item.title')
      //   console.log(item.title)
      //   console.log('item.path')
      //   console.log(item.path)
      // });
    },
    async onPrepared(app) {
      await app.writeTemp('foo.js', 'export const foo = \'bar\'')
    }
  }
}
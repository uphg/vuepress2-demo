export const fooPlugin = {
  name: 'vuepress-plugin-foo',
  extendsPageOptions: (PageOptions, app) => {
    const { filePath } = PageOptions
    console.log('filePath')
    console.log(filePath)
    console.log('\n' + 'PageOptions:')
    console.log(PageOptions)

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
    console.log('title')
    console.log(title)
    console.log('path')
    console.log(path)
  }
}
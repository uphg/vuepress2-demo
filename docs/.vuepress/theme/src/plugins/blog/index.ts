// const { path } = require('@vuepress/utils')
import { createPage } from '@vuepress/core';
import { createPosts, isPostDir } from './post'
import { createSimplePosts } from './simple-post'
import { createArchivePaginations } from '../../utils';

const _descriptions = [] as { [key: string]: string }[]

module.exports = (options, ctx) => {
  return {
    name: 'vuepress-plugin-foo',
    extendsPageOptions: (PageOptions, app) => {
      const { filePath } = PageOptions
      if (filePath?.startsWith(app.dir.source('posts/'))) {
        return {
          frontmatter: {
            // 文件路径属性，可修改
            // permalinkPattern: '/:year/:month/:day/:slug.html',
            permalinkPattern: '/:slug.html',
          },
        }
      }
      return {}
    },
    extendsPageData(page) {
      if (!isPostDir(page.pathInferred)) return

      const text = page.contentRendered.replace(/(<a[^>]+>#<\/a>)|(<[^>]+>)/g, '')
      const description = text?.slice(0, 100) || null

      _descriptions.push({
        path: page.path,
        description: description
      })

      return {
        filePathRelative: page.filePathRelative
      }
    },
    async onPrepared(app) {
      const PREFIX = 'vuepress_blog';
      const postPageSize = 10
      const archivePageSize = 20

      const { posts: _posts, postPaginations } = createPosts(app.pages, _descriptions, postPageSize)
      const _simplePosts = createSimplePosts(_posts)

      const archivePaginations = createArchivePaginations(_posts, archivePageSize)

      await createTemp([
        {
          path: `${PREFIX}/simple-pages.js`,
          content: `export const simplePages = ${JSON.stringify(_simplePosts)}`
        },
        {
          path: `${PREFIX}/archive-pagination.js`,
          content: `export const archivePaginations = ${JSON.stringify(archivePaginations)};
          export const archiveTotal = ${_posts.length};
          export const archivePageSize = ${archivePageSize};\n`
        },
        {
          path: `${PREFIX}/post-pagination.js`,
          content: `export const postPaginations = ${JSON.stringify(postPaginations)};
          export const postTotal = ${_posts.length};
          export const postPageSize = ${postPageSize};\n`
        }
      ], app)
    },
    // 初始化之后，所有的页面已经加载完毕
    async onInitialized(app) {
      await createPageTemplate(app)
    }
  }
}

/**
 * 创建页面模板
 * 自动添加 首页、归档页、标签页
 * @param app
 */
async function createPageTemplate(app) {

  const archivepage = await createPage(app, {
    path: '/archives',
    frontmatter: {
      _archives: true
    }
  })

  const tagspage = await createPage(app, {
    path: '/tags',
    frontmatter: {
      _tags: true
    }
  })

  app.pages.push(archivepage)
  app.pages.push(tagspage)

  if (app.pages.every((page) => page.path !== '/')) {
    const homepage = await createPage(app, {
      path: '/',
      frontmatter: {
        home: true,
        layout: 'Layout',
      }
    })
    app.pages.push(homepage)
  }
}


// 生成临时文件
async function createTemp(dynamicModules, app) {
  for(const item of dynamicModules) {
    await app.writeTemp(item.path, item.content)
  }
}

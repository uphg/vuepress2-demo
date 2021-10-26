const { path } = require('@vuepress/utils')
import { createPage } from '@vuepress/core';
import { mockBlogs } from '../../mock/mock-blogs'
import { PostType } from '../../shared';
const home = path.resolve(__dirname, 'src/template/README')

module.exports = (options, ctx) => {
  return {
    name: 'vuepress-plugin-foo',
    extendsPageOptions: (PageOptions, app) => {
      const { filePath } = PageOptions
      console.log('# ================================ \n  === extendsPageOptions')
      if (filePath?.startsWith(app.dir.source('posts/'))) {
        return {
          frontmatter: {
            // permalinkPattern: '/:year/:month/:day/:slug.html', // 文件路径属性，可修改
            permalinkPattern: '/:slug.html',
          },
        }
      }
      return {}
    },
    extendsPageData(page) {
      const text = page.contentRendered.replace(/(<a[^>]+>#<\/a>)|(<[^>]+>)/g, '')
      const description = text?.slice(0, 100) || null

      return {
        filePathRelative: page.filePathRelative,
        _description: description
      }
    },
    async onGenerated(app) {
      console.log('# ================================ \n  === onGenerated')
    },
    async onPrepared(app) {
      console.log('# ================================ \n  === onPrepared')
      
      const PREFIX = 'vuepress_blog';
      const pageSize = 10

      const filterPages = pageFilters(app.pages)
      const sortPages = bubbleSort(filterPages, (current, next) => {
        const currentDate = transferMs(current?.date)
        const nextDate = transferMs(next?.date)
        return currentDate < nextDate
      })

      const pages = mockBlogs(sortPages)

      const intervals = getIntervallers(pages.length, pageSize)
      const paginationsPages = createPaginations(intervals, pages)

      await createTemp([
        {
          path: `${PREFIX}/pages.js`,
          content: `export const pages = ${JSON.stringify(pages)}`
        },
        {
          path: `${PREFIX}/paginations.js`,
          content: `export const paginationsPages = ${JSON.stringify(paginationsPages)};\nexport const total = ${pages.length};\nexport const pageSize = ${pageSize};\n`
        }
      ], app)
    },
    // 初始化之后，所有的页面已经加载完毕
    async onInitialized(app) {
      console.log('# ================================ \n  === onInitialized')
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

// 时间转毫秒
function transferMs(date) {
  return new Date(date || 0).getTime()
}

// 页面过滤
function pageFilters(pages) {
  const newPosts = [] as { [key: string]: string}[]
  // pathInferred
  for (const page of pages) {
    if (!page.pathInferred || !(page.pathInferred.startsWith('/posts'))) {
      continue
    }
    newPosts.push({
      path: page.path,
      title: page.title,
      date: page.frontmatter.date,
      ...(page.frontmatter?.tags ? { tags: page.frontmatter.tags } : {}),
      ...(page.data?._description ? { description: page.data?._description } : {})
    })
  }

  return newPosts
}

// 对象排序
function bubbleSort(array, judge) {
  let sorted = true
  for (let i = array.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (judge(array[j], array[j + 1])) {
        let temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
        sorted = false
      }
    }
    if (sorted) break
  }

  return array
}

// 获取分页间隔
function getIntervallers(max: number, interval: number = 10) {
  const count =
    max % interval === 0
      ? Math.floor(max / interval)
      : Math.floor(max / interval) + 1;
  const arr = [...new Array(count)];
  return arr.map((_, index) => {
    const start = index * interval;
    const end = (index + 1) * interval - 1;
    return [start, end > max ? max : end];
  });
}

// 生成分页
function createPaginations(intervals: number[][], pages: PostType[]) {
  const paginationPages = [] as PostType[][]
  for (const interval of intervals) {
    paginationPages.push(pages.slice(interval[0], interval[1]))
  }
  return paginationPages
}

// 生成临时文件
async function createTemp(dynamicModules, app) {
  for(const item of dynamicModules) {
    await app.writeTemp(item.path, item.content)
  }
}
import { mockBlogs } from '../../mock/mock-blogs'
import type { PostType } from '../../shared';
import { getIntervallers } from '../../utils';

export function createPosts(pages, descriptions, pageSize = 10) {
  const filterPosts = mockBlogs(postFilters(pages, descriptions))

  const _posts = bubbleSort(filterPosts, (current, next) => {
    const currentDate = transferMs(current?.date)
    const nextDate = transferMs(next?.date)
    return currentDate < nextDate
  })

  const intervals = getIntervallers(_posts.length, pageSize)
  const postPaginations = createPaginations(intervals, _posts as unknown as PostType[])

  return {
    posts: _posts,
    postPaginations
  }
}

// 判断是否是 posts 目录下文件
export function isPostDir(pathInferred) {
  if(!(typeof pathInferred === 'string')) return false

  return !!(pathInferred && pathInferred.startsWith('/posts'))
}

// 页面过滤
function postFilters(pages, descriptions) {
  const newPosts = [] as { [key: string]: string}[]
  // pathInferred
  for (const page of pages) {
    if (!isPostDir(page.pathInferred)) {
      continue
    }
    
    newPosts.push({
      path: page.path,
      title: page.title,
      date: page.frontmatter?.date,
      description: (descriptions.filter((item) => item.path === page.path)[0]).description,
      ...(page.frontmatter?.tags ? { tags: page.frontmatter.tags } : {}),
    })
  }

  return newPosts
}

// 生成分页
function createPaginations(intervals: number[][], pages: PostType[]) {
  const paginationPages = [] as PostType[][]
  for (const interval of intervals) {
    paginationPages.push(pages.slice(interval[0], interval[1]))
  }
  return paginationPages
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

function transferMs(date) {
  return new Date(date || 0).getTime()
}
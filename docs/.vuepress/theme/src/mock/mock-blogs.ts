export const mockBlogs = (existingBlogs, number = 100) => {
  const newBlogList = [] as { path: string, title: string, date: string | number, description: string, tags: string[] }[]
  const oneDay = 24 * 3600 * 1000
  const oneYear = 365 * oneDay
  for (let i = 0; i < number; i++) {
    newBlogList.push({
      path: `博客${i}的路径`,
      title: `标题${i}`,
      date: new Date().getTime() - (Math.floor(i / 10) * oneYear + (i * 30 * oneDay)),
      description: `“帕霍姆情节”是不是就是指那种有手无胃的人？这些人有强壮的手脚，却没有胃。他们感觉不到幸福，只有饥饿。他死的时候都不知道，其实人只需要从头到脚六英尺那么一小块土地。${i}`,
      tags: ['JavaScript', 'ES6', 'Vue', 'SSR', 'Node.js']
    })
  }

  return [...existingBlogs, ...newBlogList]
}
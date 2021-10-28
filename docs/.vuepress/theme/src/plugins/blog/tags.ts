import orderBy from 'lodash.orderby'



export const createTags = (pages) => {
  const newTags: string[] = []
  const _posts = [] as {}[]


  for (const page of pages) {
    const { path, title, date, tags } = page

    // 生成筛选博客列表
    _posts.push({
      path,
      title,
      date,
      ...(tags ? { tags } : {}),
    })

    // 生成 tags
    if (!(tags && tags.length > 0)) continue
    for (const tag of tags) {
      !newTags.includes(tag) && (newTags.push(tag))
    }
  }

  return {
    tags: orderBy(newTags),
    tagPages: _posts
  }
}
let _headerFlats = [] as { level: number; slug: string; title: string }[]

const headerFlat = (headers) => {
  for (const header of headers) {
    const { level, slug, title, children } = header
    _headerFlats.push({ level, slug, title })
    if (children && children.length > 0) {
      headerFlat(children)
    }
  }
}

export const useHeaderFlats = (headers) => {
  _headerFlats = []
  headerFlat(headers)
  return _headerFlats
} 
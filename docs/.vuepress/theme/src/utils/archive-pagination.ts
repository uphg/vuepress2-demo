import { getIntervallers } from "./get-intervallers"
import { ArchiveType } from '../shared'

const dayjs = require('dayjs')

const getCurrentYear = (archives: ArchiveType[], date?: string) => {
  for (let i = 0; i < archives.length; i++) {
    const item = archives[i]
    if (item.year && item.year === dayjs(date).year()) {
      return item
    }
  }
}

export const createArchives = (pages) => {
  const newArchives = [] as ArchiveType[]
  for (const page of pages) {
    const { path, title, date, tags } = page

    if (newArchives.length <= 0) {
      newArchives.push({
        year: dayjs(page.date).year(),
        list: [{ path, title, date, tags }]
      })
      continue
    }

    const currentYear = getCurrentYear(newArchives, page.date)

    if (currentYear) {
      currentYear.list.push({ path, title, date, tags })
    } else {
      newArchives.push({
        year: dayjs(page.date).year(),
        list: [{ path, title, date, tags }]
      })
    }
  }

  return newArchives
}

export const createArchivePaginations = (pages, pageSize = 20) => {
  const intervals = getIntervallers(pages.length, pageSize)
  const paginationPages = [] as ArchiveType[][]

  for (const interval of intervals) {
    const onePage = pages.slice(interval[0], interval[1])
    paginationPages.push(createArchives(onePage))
  }

  return paginationPages
}

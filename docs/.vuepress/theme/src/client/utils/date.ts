// import dayjs from 'dayjs'
// import relativeTime from 'dayjs/plugin/relativeTime' 
const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

/**
 * 显示相对时间
 * 在两年内显示相对时间，两年后显示绝对时间。
 */
 export function displayTime(time: number | string): string {
  if (!time) return ''
  const currentTime = new Date().getTime()
  const postTime = new Date(time).getTime()
  const oneDay = 24 * 3600 * 1000
  const oneYear = 365 * oneDay - (31 * oneDay)
  const lastYearToday = currentTime - oneYear

  return postTime - lastYearToday > 0 ? dayjs(time).fromNow() : dayjs(time).format('YYYY-MM-DD')
}
// import dayjs from 'dayjs'
// import relativeTime from 'dayjs/plugin/relativeTime' 
const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

/**
 * 显示相对时间
 * @param time 
 * @returns date
 */
export function timeFromNow(time: number | string | Date): string {
  if (!time) return ''
  const currentTime = new Date().getTime()
  const postTime = new Date(time).getTime()
  const oneDay = 24 * 3600 * 1000
  const oneYear = 365 * oneDay - (31 * oneDay)
  const lastYearToday = currentTime - oneYear * 2

  return postTime - lastYearToday > 0 ? dayjs(time).fromNow() : dayjs(time).format('YYYY-MM-DD')
}

/**
 * 格式化时间方法
 * @param time 
 * @param format 
 * @returns date
 */
export function timeFormat(time: number | string | Date, format='YYYY-MM-DD HH:mm'): string {
  return dayjs(time).format(format) 
}

// 'YYYY-MM-DD HH:mm'
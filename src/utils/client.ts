import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const getRelativeTime = (timestamp: number) => {
  const now = dayjs()
  const time = dayjs.unix(timestamp)
  const diffInSeconds = now.diff(time, 'second')

  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${now.diff(time, 'minute')}m`
  if (diffInSeconds < 86400) return `${now.diff(time, 'hour')}h`
  if (diffInSeconds < 2592000) return `${now.diff(time, 'day')}d`
  if (diffInSeconds < 31536000) return `${now.diff(time, 'month')}mo`
  return `${now.diff(time, 'year')}y`
}

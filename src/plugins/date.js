import { format, parse, compareDesc } from 'date-fns'

const date = {
  format (date, fmtstr = 'YYYY-MM-DD HH:mm:ss') {
    if (typeof date === 'string') date = parse(date)
    return format(date, fmtstr)
  },
  compare (dateLeft, dateRight) {
    const dateArray = [...arguments]
      .map(date => typeof date === 'string' ? parse(date) : date)

    return compareDesc(dateArray[0], dateArray[1])
  }
}

export default date

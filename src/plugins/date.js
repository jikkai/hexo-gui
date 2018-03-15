import { format, parse } from 'date-fns'

const date = {
  format (date, fmtstr = 'YYYY-MM-DD HH:mm:ss') {
    if (typeof date === 'string') date = parse(date)
    return format(date, fmtstr)
  }
}

export default date

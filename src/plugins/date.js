import moment from 'moment'

const date = {
  format (date, fmtstr = 'YYYY-MM-DD HH:mm:ss') {
    return date ? moment(date).format(fmtstr) : ''
  }
}

export default date

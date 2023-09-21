export default function (date, dateFormat = '%Y-%M-%d %H:%m:%s', useStr = '') {
  if (date) {
    if (!(date instanceof Date)) {
      date = new Date(date.replace('GMT', useStr))
    }
    return date.strftime(dateFormat)
  }
  return ''
}

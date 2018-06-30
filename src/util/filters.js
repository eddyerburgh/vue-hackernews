export function host (url) {
  if (!url) {
    return ''
  }
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '') // #A
  const parts = host.split('.').slice(-3) // #B
  if (parts[0] === 'www') {
    parts.shift() // #C
  }
  return parts.join('.') // #D
}

export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time) // #A
  if (between < 3600) { // #B
    return pluralize((between / 60), ' minute') // #C
  } else if (between < 86400) {
    return pluralize((between / 3600), ' hour')
  } else {
    return pluralize((between / 86400), ' day')
  }
}

function pluralize (time, label) { // #D
  const roundedTime = Math.round(time) // #E
  if (roundedTime === 1) {
    return roundedTime + label
  }
  return roundedTime + label + 's'
}

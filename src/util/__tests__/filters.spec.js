import { host, timeAgo } from '../filters'

describe('host', () => {
  test('returns empty string if url is undefined', () => {
    expect(host(undefined)).toBe('')
  })

  test('returns the host from a URL beginning with http://', () => {
    const url = 'http://google.com'
    expect(host(url)).toBe('google.com')
  })

  test('returns the host from a URL beginning with https://', () => {
    const url = 'https://google.com'
    expect(host(url)).toBe('google.com')
  })

  test('removes path from URL', () => {
    const url = 'google.com/long/path/ '
    expect(host(url)).toBe('google.com')
  })

  test('removes www from URL', () => {
    const url = 'www.blogs.google.com/'
    expect(host(url)).toBe('blogs.google.com')
  })

  test('keep the subdomain', () => {
    const url = 'https://blogs.google.com/long/path/ '
    expect(host(url)).toBe('blogs.google.com')
  })

  test('returns one subdomain and removes others', () => {
    const url = 'personal.blogs.google.com/long/path/ '
    expect(host(url)).toBe('blogs.google.com')
  })
})

describe('timeAgo', () => {
  Date.now = () => new Date('2018')
  const unixTime = Date.now() / 1000

  const seconds = (second) => second * 1
  const minutes = (minute) => minute * seconds(60)
  const hours = (hour) => hour * minutes(60)
  const days = (day) => day * hours(24)

  test('returns singular minute', () => {
    expect(timeAgo(unixTime - minutes(1))).toBe('1 minute')
  })

  test('returns plural minutes', () => {
    expect(timeAgo(unixTime - minutes(5))).toBe('5 minutes')
  })

  test('returns singular hour', () => {
    expect(timeAgo(unixTime - hours(1))).toBe('1 hour')
  })

  test('returns plural hours', () => {
    expect(timeAgo(unixTime - hours(5))).toBe('5 hours')
  })

  test('returns singular day', () => {
    expect(timeAgo(unixTime - days(1))).toBe('1 day')
  })

  test('returns plural days', () => {
    expect(timeAgo(unixTime - days(5))).toBe('5 days')
  })

  test('returns day rounded to nearest value', () => {
    expect(timeAgo(unixTime - (days(2) + hours(10)))).toBe('2 days')
  })
})

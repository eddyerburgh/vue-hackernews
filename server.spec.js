import request from 'supertest'
import app from './server'

describe('server', () => {
  test('/top returns 200', () => {
    return request(app)
      .get('/top')
      .expect(200)
  })
})

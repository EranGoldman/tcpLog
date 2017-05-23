import request from 'supertest-as-promised'
import express from '../../services/express'
import routes, { Log } from '.'

const app = () => express(routes)

let log

beforeEach(async () => {
  log = await Log.create({})
})

test('POST /logs 201', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ source: 'test', type: 'test', message: 'test', comment: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.source).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.message).toEqual('test')
  expect(body.comment).toEqual('test')
})

test('GET /logs 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /logs/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${log.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(log.id)
})

test('GET /logs/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /logs/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`/${log.id}`)
    .send({ source: 'test', type: 'test', message: 'test', comment: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(log.id)
  expect(body.source).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.message).toEqual('test')
  expect(body.comment).toEqual('test')
})

test('PUT /logs/:id 404', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ source: 'test', type: 'test', message: 'test', comment: 'test' })
  expect(status).toBe(404)
})

test('DELETE /logs/:id 204', async () => {
  const { status } = await request(app())
    .delete(`/${log.id}`)
  expect(status).toBe(204)
})

test('DELETE /logs/:id 404', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  expect(status).toBe(404)
})
